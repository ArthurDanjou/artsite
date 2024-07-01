<div align="center">

# [Portfolio 2024](https://arthurdanjou.fr/)

🖼 My new portfolio built with `Nuxt`, `Nuxt Content`, `NuxtUI`, `Nuxt Studio`, `NuxtHub`

</div>

---

## ⚒️ Tech stack

- **UI** → [Vue.js](https://vuejs.org/)
- **Framework** → [Nuxt.js](https://nuxtjs.org/)
- **Content** → [Nuxt Content](https://content.nuxtjs.org/)
- **Design System** → [NuxtUI](https://nuxtui.com/)
- **CMS & Editing** → [Nuxt Studio](https://studio.nuxtjs.org/)
- **Langage** → [Typescript](https://www.typescriptlang.org/)
- **Deployment** → [NuxtHub](https://hub.nuxt.com/)
- **Styling** → [Sass](https://sass-lang.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager** → [pnpm](https://pnpm.io/)

## 🍱 Adding content

### Writings

Add a new `.md` file in `/content/writings/` and follow the same pattern as the other articles. Add images
in `/public/images/writings/`.

### Uses

Add a new item in `/content/uses`.

## ⚡ Running locally

```bash
# Installation (recommended for nuxt3)
pnpm i --shamefully-hoist

# Development server
pnpm dev
```

Add a `.env` file with the following content:

```env
# Wakatime
NUXT_WAKATIME_USER_ID=...
NUXT_WAKATIME_CODING=...
NUXT_WAKATIME_LANGUAGES=...
NUXT_WAKATIME_OS=...
NUXT_WAKATIME_EDITORS=...

# Nuxt Sitemap
NUXT_PUBLIC_SITE_URL=...

# Nuxt Hub
NUXT_HUB_PROJECT_KEY=...

# Discord
NUXT_DISCORD_ID=...
NUXT_DISCORD_TOKEN=...
NUXT_DISCORD_USER_ID=...

# Cloud files
NUXT_PUBLIC_CLOUD_RESUME=...
```

## 📄 License

[MIT](./LICENSE) © Arthur Danjou