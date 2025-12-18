import { streamText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js'

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
  let mcpClient: Client | null = null
  let availableTools: any[] = []

  try {
    // Connect to MCP server
    const transport = new SSEClientTransport(
      new URL('https://api.arthurdanjou.fr/mcp')
    )
    mcpClient = new Client(
      {
        name: 'artsite-chat',
        version: '1.0.0',
      },
      {
        capabilities: {},
      }
    )

    await mcpClient.connect(transport)

    // List available tools from MCP
    const toolsResponse = await mcpClient.listTools()
    availableTools = toolsResponse.tools || []
  } catch (error) {
    console.error('Failed to connect to MCP server:', error)
    // Continue without MCP tools if connection fails
  }

  // Get Cloudflare AI binding
  const ai = event.context.cloudflare?.env?.AI

  if (!ai) {
    throw createError({
      statusCode: 500,
      message: 'AI binding not available',
    })
  }

  // Configure Google Gemini model via Cloudflare AI Gateway
  const google = createGoogleGenerativeAI({
    apiKey: '',
    baseURL: 'https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY/google-ai-studio/v1beta',
  })

  // System prompt to restrict responses to Arthur Danjou related topics
  const systemPrompt = `You are a helpful assistant that only answers questions related to Arthur Danjou, his projects, skills, experience, and professional work. 
If asked about topics unrelated to Arthur Danjou, politely inform the user that you can only help with questions about Arthur Danjou.

Arthur Danjou is an AI enjoyer and Mathematics student at Paris Dauphine-PSL University specialised in Statistics. He is a developer with interest in Artificial Intelligence and Machine Learning.`

  // Prepare messages with system prompt
  const messagesWithSystem = [
    { role: 'system', content: systemPrompt },
    ...messages,
  ]

  // Convert MCP tools to AI SDK format
  const tools: Record<string, any> = {}
  for (const tool of availableTools) {
    tools[tool.name] = {
      description: tool.description,
      parameters: tool.inputSchema,
      execute: async (params: any) => {
        if (!mcpClient) {
          throw new Error('MCP client not available')
        }
        const result = await mcpClient.callTool({
          name: tool.name,
          arguments: params,
        })
        return result.content
      },
    }
  }

  // Stream the response using AI SDK with Cloudflare Workers AI
  const result = streamText({
    model: google('gemini-1.5-flash'),
    messages: messagesWithSystem,
    tools: Object.keys(tools).length > 0 ? tools : undefined,
  })

  // Return the stream response
  return result.toDataStreamResponse()
})
