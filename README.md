<div align="center">

# [Arthur Danjou | Portfolio](https://arthurdanjou.fr/)

AI Research Intern at CMAP, Ecole Polytechnique. Personal portfolio built with Nuxt 3 and deployed to Cloudflare Workers.

[![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://cloudflare.com/)

[🌐 Live](https://arthurdanjou.fr/) · [🐛 Issues](https://github.com/ArthurDanjou/artsite/issues)

</div>

## Tech Stack

- **Framework** — [Nuxt 3](https://nuxt.com/) with Cloudflare Workers preset
- **UI** — [Nuxt UI v4](https://ui.nuxt.com/) + Tailwind CSS
- **Content** — [Nuxt Content](https://content.nuxtjs.org/) with D1 database
- **Database** — Cloudflare D1 (SQLite)
- **Cache** — Cloudflare KV
- **Deployment** — [NuxtHub](https://hub.nuxt.com/) on Cloudflare
- **Package Manager** — [Bun](https://bun.sh/)
- **Validation** — [Zod](https://zod.dev/)
- **Composables** — [VueUse](https://vueuse.org/)
- **Icons** — [Iconify](https://iconify.design/)

## Getting Started

```bash
# Install
bun install

# Dev server
bun run dev

# Build
bun run build

# Lint
bun run lint

# Deploy
bun run deploy
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
NUXT_HA_URL=           # Home Assistant instance URL
NUXT_HA_TOKEN=         # Home Assistant long-lived access token
NUXT_STATUS_PAGE=      # Uptime Kuma status page URL
NUXT_DISCORD_USER_ID=  # Discord user ID for activity
NUXT_WAKATIME_*        # WakaTime API keys (optional)
```

Only `NUXT_HA_URL` + `NUXT_HA_TOKEN` are needed for the live status widget. The site works without any env vars.

## Project Structure

```
artsite/
├── app/
│   ├── components/
│   │   ├── content/           # MDC components (NowStatus, TalkCard, TalksList, HoverText…)
│   │   └── home/              # Homepage sections (Skills, Timeline, Live widgets)
│   ├── composables/           # useContent()
│   ├── pages/                 # File-based routing
│   │   ├── index.vue          # Home
│   │   ├── projects/          # /projects & /projects/[slug]
│   │   ├── talks.vue          # /talks
│   │   ├── uses.vue           # /uses
│   │   └── hobbies.vue        # /hobbies
│   └── app.vue
├── content/
│   ├── index.md               # Homepage content
│   ├── talks.md               # Talks page intro
│   ├── talks.json             # Talks data (upcoming/past)
│   ├── uses.md                # Hardware & software setup
│   ├── hobbies.md             # Hobbies
│   ├── projects/*.md          # Project pages
│   ├── experiences/*.md       # Work experience
│   ├── education/*.md         # Academic background
│   ├── skills.json            # Skills data
│   └── contact.json           # Contact links
├── server/
│   ├── api/                   # Content & integration API endpoints
│   │   └── ha/                # Home Assistant proxy (status, media, monitors)
│   └── routes/resumes/        # Static PDF resume endpoints
├── types/                     # TypeScript definitions & navigation config
├── nuxt.config.ts
├── content.config.ts          # Content collections with Zod schemas
├── wrangler.jsonc             # Cloudflare Workers config
└── package.json
```

## Pages

| Route | Description |
|---|---|
| `/` | Home — research focus, skills, experience timeline, live telemetry |
| `/projects` | Project portfolio grouped by type |
| `/projects/[slug]` | Individual project page |
| `/talks` | Academic presentations (upcoming + past) |
| `/uses` | Hardware, software, and homelab infrastructure |
| `/hobbies` | Personal interests |
| `/resumes/en` | English resume (PDF) |
| `/resumes/fr` | French resume (PDF) |

## License

[MIT](./LICENSE) © Arthur Danjou
