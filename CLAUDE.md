# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Lint code
bun run lint

# Deploy to Cloudflare
bun run deploy

# Generate Cloudflare types
bun run cf-typegen
```

## Architecture Overview

This is a **Nuxt 3 portfolio website** deployed to **Cloudflare Workers** with the following architecture:

### Tech Stack
- **Framework**: Nuxt 3 (SSR/ISR with Cloudflare preset)
- **UI**: Nuxt UI v4 with Tailwind CSS
- **Content**: Nuxt Content with D1 database backend
- **Styling**: SASS (main.css) + Tailwind CSS
- **Database**: Cloudflare D1 (SQLite)
- **Cache**: Cloudflare KV
- **Icons**: Iconify
- **Composables**: VueUse
- **Validation**: Zod
- **Deployment**: Cloudflare Wrangler + NuxtHub

### Key Patterns

1. **Content Collections**: Content is organized into typed collections (projects, experiences, education, skills, contact, languages, hobbies) defined in `content.config.ts` with Zod schemas

2. **Server API Routes**: Data-fetching endpoints in `server/api/` use `queryCollection()` to fetch from D1 and return JSON to the client

3. **Composables**: Shared logic lives in `app/composables/`:
   - `content.ts`: Fetches all main content collections
   - `projects.ts`: Project status/type color mappings

4. **Component Structure**: Components are organized by domain in `app/components/`:
   - `home/`: Homepage-specific components
   - `content/`: Content projection components
   - Shared components at root level

5. **Pages**: File-based routing with dynamic routes for projects (`pages/projects/[slug].vue`)

6. **Internationalization**: English/French support with content files in appropriate locales

7. **Server-side Resumes**: Static PDF resume endpoints in `server/routes/resumes/` (en.get.ts, fr.get.ts)

### Cloudflare Configuration

- **Binding**: DB (D1), CACHE (KV), ASSETS (static files)
- **Workers preset**: `cloudflare_module`
- **Exported file**: `.output/server/index.mjs`
- **Preview URLs**: Enabled for branch deployments

### Environment Variables

Required for full functionality (see `.env.example`):
- `STUDIO_GITHUB_CLIENT_ID` / `STUDIO_GITHUB_CLIENT_SECRET`: Nuxt Studio integration
- `NUXT_WAKATIME_*`: Coding statistics API keys
- `NUXT_DISCORD_USER_ID`: Discord activity display
- `NUXT_STATUS_PAGE`: Status page URL

### Build Output

- Client assets: `.output/public/`
- Server code: `.output/server/`
- Database migrations: `.output/server/db/migrations/`
