<div align="center">

# [Arthur Danjou | Portfolio](https://arthurdanjou.fr/)

AI Research Intern at CMAP, Ecole Polytechnique. Personal portfolio built with Nuxt 4 and deployed to Cloudflare Workers.

[![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://cloudflare.com/)

[🌐 Live](https://arthurdanjou.fr/) · [🐛 Issues](https://github.com/ArthurDanjou/artsite/issues)

</div>

## Overview

This repository contains my personal portfolio and research site. It presents my research focus, projects, talks, experience, education, setup, and live homelab telemetry. Content lives in Markdown and JSON under `content/`, pages live under `app/pages/`, and the site is deployed to Cloudflare Workers.

## Tech Stack

- **Framework** — [Nuxt 4](https://nuxt.com/) with Cloudflare Workers preset
- **UI** — [Nuxt UI v4](https://ui.nuxt.com/) plus Tailwind CSS
- **Content** — [Nuxt Content](https://content.nuxt.com/) with Zod schemas in `content.config.ts`
- **Math** — remark-math and rehype-katex for formulas, plus Satori for OG images
- **Data** — Cloudflare D1 through SQLite and Drizzle, with Cloudflare KV cache
- **Deployment** — [NuxtHub](https://hub.nuxt.com/) and Wrangler on Cloudflare
- **Package Manager** — [Bun](https://bun.sh/)
- **Composables** — [VueUse](https://vueuse.org/)
- **Icons** — [Iconify](https://iconify.design/)

## Getting Started

```bash
# Install
bun install

# Dev server
bun run dev

# Production build
bun run build

# Preview the production build with Wrangler
bun run preview

# Lint
bun run lint

# Generate Cloudflare types, build, and deploy
bun run deploy
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
NUXT_HA_URL=           # Home Assistant instance URL
NUXT_HA_TOKEN=         # Home Assistant long-lived access token
NUXT_DISCORD_USER_ID=  # Discord user ID for activity
NUXT_WAKATIME_*        # WakaTime API keys (optional)
```

Only `NUXT_HA_URL` plus `NUXT_HA_TOKEN` are needed for the live status widget. The site works without any env vars.

## Project Structure

```
artsite/
├── app/
│   ├── components/
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   ├── AppBackground.vue
│   │   ├── ThemeSwitcher.vue
│   │   ├── content/             # MDC components (HoverText, ProjectCard, TalkCard, ProseH1, ProseH2, ProseIcon)
│   │   ├── home/                # Homepage sections (Name, Skills, Quote, CatchPhrase, Link, timeline, live widgets)
│   │   └── OgImage/             # Pergel.satori template for social images
│   ├── composables/             # useContent and timeline helpers
│   ├── pages/
│   │   ├── index.vue            # Home
│   │   ├── research.vue         # /research
│   │   ├── projects/
│   │   │   ├── index.vue        # /projects
│   │   │   └── [slug].vue       # /projects/[slug]
│   │   ├── talks.vue            # /talks
│   │   ├── now.vue              # /now
│   │   ├── telemetry.vue        # /telemetry
│   │   └── uses.vue             # /uses
│   └── app.vue
├── content/
│   ├── index.md                 # Homepage content
│   ├── research.md              # Research page
│   ├── now.md                   # Current focus
│   ├── uses.md                  # Hardware and software setup
│   ├── telemetry.md             # Live telemetry page
│   ├── projects/*.md            # Project pages
│   ├── experiences/*.md         # Work experience entries
│   ├── education/*.md           # Academic background entries
│   ├── skills.json              # Skills data
│   ├── talks.json               # Talks data (upcoming and past)
│   ├── languages.json           # Languages data
│   └── contact.json             # Contact links
├── server/
│   ├── api/                     # Read endpoints (projects, experiences, education, skills, talks, languages, contact, stats, activity)
│   │   └── ha/                  # Home Assistant proxy (status, media, media-cover, monitors)
│   ├── routes/
│   │   └── resumes/             # Static PDF resume endpoints (en, fr)
│   └── db/
│       └── migrations/          # SQLite migrations
├── types/                       # TypeScript definitions plus navigation config
├── nuxt.config.ts
├── content.config.ts            # Content collections with Zod schemas
├── wrangler.jsonc               # Cloudflare Workers config
├── wrangler.dev.jsonc           # Dev-only Wrangler config
└── package.json
```

## Pages

| Route | Description |
|---|---|
| `/` | Home with research focus, skills, experience, education, and quotes |
| `/research` | Research interests and thesis direction |
| `/projects` | Project portfolio grouped by type |
| `/projects/[slug]` | Individual project page |
| `/talks` | Academic presentations, upcoming and past |
| `/now` | Current focus snapshot plus link to live telemetry |
| `/telemetry` | Live homelab telemetry with environment, status, and activity |
| `/uses` | Hardware, software, and homelab infrastructure |
| `/resumes/en` | English resume (PDF) |
| `/resumes/fr` | French resume (PDF) |

## Content Model

Page collections use `pageSeoSchema` and pair one Markdown file with one page component. The SEO title and description come from the Markdown frontmatter, following the `now` and `research` pattern. Data collections back the portfolio sections and the homepage timelines.

## API Overview

The server exposes read only JSON endpoints for the frontend sections, a Home Assistant proxy under `server/api/ha/`, and resume file routes under `server/routes/resumes/`. Responses are cached through Cloudflare KV where configured.

## Deployment

The site builds with Nuxt and deploys to Cloudflare Workers with Wrangler. Pull requests get a versioned preview URL through the Cloudflare workflow. The production domain is served from `arthurdanjou.fr`.

## License

[MIT](./LICENSE) © Arthur Danjou
