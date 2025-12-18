# README Addition for Chat Feature

Add this section to the main README.md under the Features section:

---

## 🤖 AI Chat Assistant

An intelligent chat interface powered by Google Gemini that answers questions about Arthur Danjou's work, projects, and expertise.

**Features:**
- Real-time streaming responses
- Integration with Arthur's MCP server for contextual information
- Restricted to Arthur Danjou related topics
- Powered by AI SDK v6 and Google Gemini

**Try it:** Visit [/chat](/chat) to start a conversation!

---

## Chat Feature

Add to the Tech Stack section:

- **AI Integration** → [AI SDK v6](https://sdk.vercel.ai/docs) & [Google Gemini](https://ai.google.dev/)
- **MCP Integration** → [Model Context Protocol](https://modelcontextprotocol.io/)

---

## Environment Variables

Add to the environment variables documentation:

```bash
# Chat Agent Configuration
GOOGLE_API_KEY=                # Google Gemini API key (required for chat)
GEMINI_API_KEY=                # Alternative name for Google API key

# Optional: Cloudflare AI Gateway
CF_ACCOUNT_ID=                 # Cloudflare account ID for AI Gateway
CF_GATEWAY_ID=                 # Cloudflare Gateway ID
```
