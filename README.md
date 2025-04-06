<div align="center">

# [Arthur Danjou | Portfolio 2024](https://arthurdanjou.fr/)

![Portfolio Screenshot](public/portfolio/preview.png)

My professional portfolio built with modern Nuxt.js technologies, showcasing projects, skills, and experience.

[![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Adding Content](#-adding-content)
  - [Projects](#projects)
  - [Writings](#writings)
  - [Uses Page](#uses-page)
- [Integrations](#-integrations)
- [License](#-license)
- [Contact](#-contact)

## ✨ Features

- **Responsive Design** - Fully responsive layout that works on all devices
- **i18n Support** - Multilanguage content with Nuxt i18n
- **Content Management** - Easy content editing with Nuxt Content and Nuxt Studio
- **Modern Styling** - Beautiful UI built with Tailwind CSS and SASS
- **Performance Optimized** - Fast loading times and SEO optimized
- **Analytics** - WakaTime integration to track coding statistics
- **Discord Integration** - Real-time Discord status display
- **CI/CD** - Automated deployment with NuxtHub

## ⚒️ Tech Stack

- **UI Framework** → [Vue.js 3](https://vuejs.org/)
- **Framework** → [Nuxt 3](https://nuxt.com/)
- **Content Management** → [Nuxt Content](https://content.nuxtjs.org/)
- **Design System** → [NuxtUI](https://ui.nuxt.com/)
- **CMS & Editing** → [Nuxt Studio](https://nuxt.studio)
- **Language** → [TypeScript](https://www.typescriptlang.org/)
- **Deployment** → [NuxtHub](https://hub.nuxt.com/)
- **Styling** → [Sass](https://sass-lang.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager** → [pnpm](https://pnpm.io/)
- **Internationalization** → [Nuxt i18n](https://i18n.nuxtjs.org/)

## 📂 Project Structure

```
├── assets/              # Static assets like global styles
├── components/          # Vue components
├── content/             # Markdown content for the portfolio
│   ├── projects/        # Portfolio projects
│   ├── writings/        # Writings
│   └── uses/            # Uses page items
├── layouts/             # Page layouts
├── pages/               # Application pages
├── public/              # Public static files
│   ├── projects/        # Projects images
│   └── writings/        # Writings images
├── server/              # Server API routes
├── utils/               # Utility functions
├── .env.example         # Example environment variables
├── nuxt.config.ts       # Nuxt configuration
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## 🍱 Adding Content

### Projects

1. Create a new `.md` file in the `/content/projects/` directory
2. Follow the structure of existing projects:

```md
---
---
slug: project-slug
title: Project Title
description: A brief description of the project
publishedAt: YYYY/MM/DD
readingTime: 1
cover: project-slug/cover.png
tags:
  - web
---

## Project content goes here

Detailed description and information about the project.
```

3. Add related project images to `/public/projects/project-slug/`

### Writings

1. Create a new `.md` file in the `/content/writings/` directory
2. Follow the structure of existing projects:

```md
---
slug: article-slug
title: The title of the article
description: A brief description of the article
readingTime: 1
publishedAt: YYYY/MM/DD
cover: article-slug/cover.png
tags:
  - tag1
  - tag2
  - tag3
---

## Writing content goes here

Detailed description and information about the article.
```

3. Add related writing images to `/public/writings/article-slug/`

### Uses Page

Add new items to the `/content/uses/` directory following the existing pattern:

```json
{
  "name": "Name of the item",
  "description": {
    "en": "Item description in English",
    "fr": "Item description in French",
    "es": "Item description in Spanish"
  },
  "category": "Item category name"
}
```

## 🔌 Integrations

- **WakaTime** - Track coding time and statistics
- **Discord** - Display real-time Discord status
- **Nuxt Studio** - Headless CMS for content management
- **Nuxt i18n** - Internationalization support

## 📄 License

[MIT](./LICENSE) © Arthur Danjou

## 📬 Contact

- Website: [arthurdanjou.fr](https://arthurdanjou.fr)
- GitHub: [@ArthurDanjou](https://github.com/ArthurDanjou)
- LinkedIn: [Arthur Danjou](https://linkedin.com/in/arthurdanjou)
