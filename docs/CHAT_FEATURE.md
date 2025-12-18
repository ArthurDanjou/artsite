# Chat Feature Documentation

## Overview

The chat feature provides an AI-powered conversational interface that allows users to ask questions about Arthur Danjou's work, projects, skills, and professional experience.

## Architecture

### Components

1. **Chat UI** (`/app/pages/chat.vue`)
   - Vue 3 page component with reactive message handling
   - Real-time streaming response display
   - Clean, user-friendly interface with loading states

2. **Chat API** (`/server/api/chat.post.ts`)
   - Nuxt server endpoint handling chat requests
   - Integration with Cloudflare Workers AI via AI SDK v6
   - MCP server connection for Arthur's specific context
   - Streaming text generation for better UX

### Technology Stack

- **AI SDK v6 (Beta)**: Vercel's AI SDK for LLM integration
- **workers-ai-provider**: Cloudflare Workers AI provider for AI SDK
- **Cloudflare Workers AI**: LLM runtime (@cf/meta/llama-3.1-8b-instruct)
- **MCP (Model Context Protocol)**: Connection to Arthur's resource server

## Configuration

### Cloudflare AI Binding

The chat feature uses Cloudflare Workers AI, which is already configured in `wrangler.jsonc`:

```json
{
  "ai": {
    "binding": "AI",
    "remote": true
  }
}
```

**No API keys required!** The AI binding is automatically available when deployed to Cloudflare Pages.

### Local Development

For local development, you can use `wrangler dev` with the `--remote` flag to connect to Cloudflare's AI services, or the AI binding will work automatically when running through Cloudflare's development environment.

## Features

### Chat Restrictions

The AI assistant is configured to only respond to questions related to Arthur Danjou:
- Professional experience
- Projects and work
- Skills and expertise
- Educational background
- Interests in AI and Mathematics

Questions unrelated to Arthur Danjou will receive a polite redirect.

### MCP Integration

The chat connects to Arthur's MCP server at `https://api.arthurdanjou.fr/mcp` to fetch:
- Resources: Information about Arthur's work
- Tools: Specialized functions for querying Arthur's data
- Prompts: Pre-configured conversation starters

### Streaming Responses

The chat implements streaming responses for a better user experience:
- Text appears in real-time as it's generated
- No waiting for complete responses
- More natural conversation flow

## API Endpoints

### POST /api/chat

Processes chat messages and returns streaming AI responses.

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "What projects has Arthur worked on?"
    }
  ]
}
```

**Response:**
- Streaming text response in AI SDK format
- Content-Type: `text/event-stream`
- Data format: Newline-delimited JSON chunks

## Development

### Running Locally

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev

# Visit http://localhost:3000/chat
```

### Testing

The chat works automatically with Cloudflare's AI binding. To test:

1. Deploy to Cloudflare Pages or use `wrangler dev --remote`
2. Navigate to `/chat`
3. Try example questions:
   - "What is Arthur studying?"
   - "Tell me about Arthur's AI projects"
   - "What programming languages does Arthur use?"

## Troubleshooting

### Common Issues

**"AI binding not available"**
- Ensure Cloudflare AI binding is configured in `wrangler.jsonc`
- Check that the deployment is on Cloudflare Pages
- For local development, use `wrangler dev --remote`

**MCP server connection fails**
- The chat will continue without MCP tools
- Check MCP server availability at https://api.arthurdanjou.fr/mcp
- MCP timeout is set to 5 seconds

**Streaming not working**
- Ensure browser supports ReadableStream
- Check for network connectivity issues
- Verify API endpoint returns correct Content-Type

**Local development issues**
- Use `npm run preview` or `wrangler pages dev` for local testing
- The AI binding requires Cloudflare's environment to function

## Security

### No API Keys Required

- Uses Cloudflare Workers AI binding
- No external API keys to manage
- Automatic authentication through Cloudflare platform
- Reduced security surface area

### Content Filtering

The system prompt ensures:
- Responses stay on-topic (Arthur Danjou related)
- No sensitive information disclosure
- Professional and appropriate responses

## Support

For issues or questions, refer to the [GitHub repository](https://github.com/ArthurDanjou/artsite).
