import { streamText } from 'ai'
import { createWorkersAI } from 'workers-ai-provider'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { messages } = body

  if (!messages || !Array.isArray(messages)) {
    throw createError({
      statusCode: 400,
      message: 'Messages array is required',
    })
  }

  // Initialize MCP client to connect to Arthur Danjou's MCP server
  let mcpTools: any[] = []
  
  try {
    // Fetch MCP resources, prompts, and tools with timeout
    const mcpResponse = await fetch('https://api.arthurdanjou.fr/mcp', {
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })
    
    if (mcpResponse.ok) {
      const mcpData = await mcpResponse.json()
      // Extract tools if available in the response
      if (mcpData.tools) {
        mcpTools = mcpData.tools
      }
    }
  } catch (error) {
    console.error('Failed to connect to MCP server:', error)
    // Continue without MCP tools if connection fails
  }

  // Get Cloudflare AI binding
  const env = event.context.cloudflare?.env
  const ai = env?.AI

  if (!ai) {
    throw createError({
      statusCode: 500,
      message: 'Cloudflare AI binding not available. Please ensure AI binding is configured in wrangler.jsonc.',
    })
  }

  // Create Cloudflare Workers AI provider
  const workersai = createWorkersAI({ binding: ai })

  // System prompt to restrict responses to Arthur Danjou related topics
  const systemPrompt = `You are a helpful assistant that only answers questions related to Arthur Danjou, his projects, skills, experience, and professional work. 
If asked about topics unrelated to Arthur Danjou, politely inform the user that you can only help with questions about Arthur Danjou.

Arthur Danjou is an AI enjoyer and Mathematics student at Paris Dauphine-PSL University specialised in Statistics. He is a developer with interest in Artificial Intelligence and Machine Learning.

You have access to information from Arthur Danjou's MCP server which provides resources, prompts, and tools about his work.`

  // Prepare messages with system prompt
  const messagesWithSystem = [
    { role: 'system', content: systemPrompt },
    ...messages,
  ]

  // Convert MCP tools to AI SDK format
  const tools: Record<string, any> = {}
  for (const tool of mcpTools) {
    tools[tool.name] = {
      description: tool.description || 'MCP tool',
      parameters: tool.inputSchema || {},
      execute: async (params: any) => {
        try {
          const response = await fetch('https://api.arthurdanjou.fr/mcp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tool: tool.name,
              params,
            }),
          })
          const result = await response.json()
          return result
        } catch (error) {
          console.error('MCP tool execution failed:', error)
          return { error: 'Failed to execute tool' }
        }
      },
    }
  }

  // Stream the response using AI SDK with Cloudflare Workers AI
  // Using @cf/meta/llama-3.1-8b-instruct model - fast and efficient
  const result = streamText({
    model: workersai('@cf/meta/llama-3.1-8b-instruct'),
    messages: messagesWithSystem,
    tools: Object.keys(tools).length > 0 ? tools : undefined,
  })

  // Return the stream response
  return result.toDataStreamResponse()
})
