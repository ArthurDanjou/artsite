import { streamText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

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
    // Fetch MCP resources, prompts, and tools
    const mcpResponse = await fetch('https://api.arthurdanjou.fr/mcp', {
      headers: {
        'Accept': 'application/json',
      },
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

  // Get environment variables from Cloudflare
  const env = event.context.cloudflare?.env
  const googleApiKey = env?.GOOGLE_API_KEY || env?.GEMINI_API_KEY
  const cfAccountId = env?.CF_ACCOUNT_ID
  const cfGatewayId = env?.CF_GATEWAY_ID

  if (!googleApiKey) {
    throw createError({
      statusCode: 500,
      message: 'Google API key not configured. Please set GOOGLE_API_KEY or GEMINI_API_KEY environment variable.',
    })
  }

  // Configure Google Gemini model
  // If Cloudflare Gateway is configured, use it; otherwise use Google directly
  let baseURL: string | undefined
  if (cfAccountId && cfGatewayId) {
    baseURL = `https://gateway.ai.cloudflare.com/v1/${cfAccountId}/${cfGatewayId}/google-ai-studio/v1beta`
  }

  const google = createGoogleGenerativeAI({
    apiKey: googleApiKey,
    baseURL,
  })

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

  // Stream the response using AI SDK with Google Gemini
  const result = streamText({
    model: google('gemini-1.5-flash'),
    messages: messagesWithSystem,
    tools: Object.keys(tools).length > 0 ? tools : undefined,
  })

  // Return the stream response
  return result.toDataStreamResponse()
})
