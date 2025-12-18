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
   - Integration with Google Gemini via AI SDK v6
   - MCP server connection for Arthur's specific context
   - Streaming text generation for better UX

### Technology Stack

- **AI SDK v6 (Beta)**: Vercel's AI SDK for LLM integration
- **Google Gemini**: LLM model (gemini-1.5-flash)
- **MCP (Model Context Protocol)**: Connection to Arthur's resource server
- **Cloudflare Workers AI**: Runtime environment
- **Cloudflare AI Gateway** (Optional): Request routing and analytics

## Configuration

### Required Environment Variables

```bash
# Google Gemini API Key (Required)
GOOGLE_API_KEY=your_google_api_key
# OR
GEMINI_API_KEY=your_gemini_api_key
```

### Optional Environment Variables

```bash
# Cloudflare AI Gateway Configuration
CF_ACCOUNT_ID=your_cloudflare_account_id
CF_GATEWAY_ID=your_gateway_id
```

### Setting Environment Variables

For Cloudflare Pages:

1. Go to your Cloudflare dashboard
2. Navigate to Workers & Pages > Your site
3. Go to Settings > Environment Variables
4. Add the required environment variables

For local development:

1. Copy `.env.example` to `.env`
2. Fill in your API keys
3. Run `npm run dev`

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

The chat requires valid API keys to function. To test:

1. Ensure environment variables are set
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

**"Google API key not configured"**
- Verify environment variables are set correctly
- Check variable names (GOOGLE_API_KEY or GEMINI_API_KEY)

**MCP server connection fails**
- The chat will continue without MCP tools
- Check MCP server availability at https://api.arthurdanjou.fr/mcp
- MCP timeout is set to 5 seconds

**Streaming not working**
- Ensure browser supports ReadableStream
- Check for network connectivity issues
- Verify API endpoint returns correct Content-Type

## Security

### API Key Protection

- API keys are stored as environment variables
- Never committed to version control
- Only accessible server-side

### Content Filtering

The system prompt ensures:
- Responses stay on-topic (Arthur Danjou related)
- No sensitive information disclosure
- Professional and appropriate responses

## Support

For issues or questions, refer to the [GitHub repository](https://github.com/ArthurDanjou/artsite).
