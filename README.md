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
- [Development](#-development)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running Locally](#running-locally)
  - [Deployment](#deployment)
- [Adding Content](#-adding-content)
  - [Portfolio Projects](#portfolio-projects)
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
│   ├── portfolio/       # Portfolio projects
│   └── uses/            # Uses page items
├── layouts/             # Page layouts
├── pages/               # Application pages
├── public/              # Public static files
│   └── portfolio/       # Portfolio images
├── server/              # Server API routes
├── utils/               # Utility functions
├── .env.example         # Example environment variables
├── nuxt.config.ts       # Nuxt configuration
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## 🚀 Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [pnpm](https://pnpm.io/) (v7 or later)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio-2024.git
cd portfolio-2024

# Install dependencies (with hoisting for Nuxt 3 compatibility)
pnpm i --shamefully-hoist
```

### Configuration

Create a `.env` file in the root directory with the following variables:

```env
# WakaTime Integration
NUXT_WAKATIME_USER_ID=your_wakatime_user_id
NUXT_WAKATIME_CODING=your_wakatime_coding_endpoint
NUXT_WAKATIME_LANGUAGES=your_wakatime_languages_endpoint
NUXT_WAKATIME_OS=your_wakatime_os_endpoint
NUXT_WAKATIME_EDITORS=your_wakatime_editors_endpoint

# SEO
NUXT_PUBLIC_SITE_URL=https://your-domain.com

# Nuxt Hub Deployment
NUXT_HUB_PROJECT_KEY=your_nuxt_hub_project_key

# Discord Integration
NUXT_DISCORD_ID=your_discord_app_id
NUXT_DISCORD_TOKEN=your_discord_token
NUXT_DISCORD_USER_ID=your_discord_user_id

# Cloud Files
NUXT_PUBLIC_CLOUD_RESUME=https://link-to-your-resume.pdf

# Internationalization
NUXT_PUBLIC_I18N_BASE_URL=https://your-domain.com
```

### Running Locally

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Deployment

The portfolio is configured to deploy automatically using NuxtHub. Push changes to your main branch to trigger a deployment.

## 🍱 Adding Content

### Portfolio Projects

1. Create a new `.md` file in the `/content/portfolio/` directory
2. Follow the structure of existing projects:

```md
---
title: Project Title
description: Brief description of the project
date: 2023-01-01
img: /portfolio/project-image.png
tags: [tag1, tag2, tag3]
links:
  website: https://project-url.com
  github: https://github.com/user/repo
---

## Project content goes here

Detailed description and information about the project.
```

3. Add related project images to `/public/portfolio/`

### Uses Page

Add new items to the `/content/uses/` directory following the existing pattern:

```md
---
category: Category Name
items:
  - name: Item Name
    description: Item description
    link: https://item-url.com
---
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