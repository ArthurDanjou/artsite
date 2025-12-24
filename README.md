<div align="center">

# [Arthur Danjou | Portfolio 2024](https://arthurdanjou.fr/)

My professional portfolio built with modern Nuxt.js technologies, showcasing projects, skills, and experience.

[![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://cloudflare.com/)

[🌐 Live Demo](https://arthurdanjou.fr/) | [🐛 Report Bug](https://github.com/ArthurDanjou/artsite/issues)

</div>

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Integrations](#-integrations)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
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
- **Deployment** → [NuxtHub](https://hub.nuxt.com/) on [Cloudflare](https://cloudflare.com/)
- **Styling** → [Sass](https://sass-lang.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager** → [Bun](https://bun.sh/)
- **Internationalization** → [Nuxt i18n](https://i18n.nuxtjs.org/)
- **Database** → [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite)
- **Composables** → [VueUse](https://vueuse.org/)
- **Validation** → [Zod](https://zod.dev/)
- **Icons** → [Iconify](https://iconify.design/)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **Bun** (latest version) - [Install Bun](https://bun.sh/docs/installation)
- **Git** for version control
- **Cloudflare Account** (for deployment)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/ArthurDanjou/artsite.git
   cd artsite
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and fill in your configuration values (see [Environment Variables](#-environment-variables) section).

4. **Start the development server**

   ```bash
   bun run dev
   ```

   The application will be available at `http://localhost:3000` 🎉

## 💻 Development

### Available Scripts

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Preview production build locally
bun run preview

# Lint code
bun run lint

# Deploy to Cloudflare
bun run deploy

# Generate Cloudflare types
bun run cf-typegen
```

### Project Configuration

The project uses:
- **ESLint** for code linting with stylistic rules (single quotes, no trailing commas)
- **TypeScript** for type safety
- **Nuxt DevTools** enabled for enhanced development experience

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# GitHub Studio Integration (for content management)
STUDIO_GITHUB_CLIENT_ID=your_github_client_id
STUDIO_GITHUB_CLIENT_SECRET=your_github_client_secret  # Keep this secret! Never commit to version control

# Discord Integration (runtime config - keep private)
NUXT_DISCORD_USER_ID=your_discord_user_id  # Private

# WakaTime Integration (for coding statistics - keep private)
NUXT_WAKATIME_USER_ID=your_wakatime_user_id  # Private
NUXT_WAKATIME_CODING=your_coding_stats_api  # Private
NUXT_WAKATIME_EDITORS=your_editors_stats_api  # Private
NUXT_WAKATIME_LANGUAGES=your_languages_stats_api  # Private
NUXT_WAKATIME_OS=your_os_stats_api  # Private

# Status Page URL
NUXT_STATUS_PAGE=your_status_page_url
```

> **Note:** Not all variables are required for basic development. The site will work without integrations, but some features may be disabled.

> **Security:** Never commit your `.env` file or expose sensitive credentials like `STUDIO_GITHUB_CLIENT_SECRET`. Keep all API keys and secrets secure.

## 📂 Project Structure

```
artsite/
├── app/                     # Application source code
│   ├── assets/              # Static assets (CSS, images)
│   ├── components/          # Vue components
│   │   ├── content/         # Content-specific components
│   │   └── home/            # Home page components
│   ├── composables/         # Vue composables
│   ├── pages/               # Application pages (file-based routing)
│   │   ├── index.vue        # Home page
│   │   ├── projects/        # Projects section
│   │   ├── hobbies.vue      # Hobbies page
│   │   ├── uses.vue         # Uses page
│   │   └── ecosystem.vue    # Ecosystem page
│   ├── app.config.ts        # App configuration
│   ├── app.vue              # Root app component
│   └── error.vue            # Error page
├── content/                 # Content files (Markdown & JSON)
│   ├── education/           # Education content
│   │   ├── bachelor.md      # Bachelor's degree information
│   │   ├── m1.md            # Master's 1st year information
│   │   └── m2.md            # Master's 2nd year information
│   ├── experiences/         # Professional experience content
│   │   ├── artdanjproduction.md
│   │   ├── erisium.md
│   │   ├── hackathon-cnd.md
│   │   ├── picard.md
│   │   └── sevetys.md
│   ├── projects/            # Project portfolio content
│   │   ├── artchat.md
│   │   ├── arthome.md
│   │   ├── artlab.md
│   │   ├── artstudies.md
│   │   ├── bikes-glm.md
│   │   ├── breast-cancer.md
│   │   ├── dropout-reduces-underfitting.md
│   │   ├── loan-ml.md
│   │   ├── monte-carlo-project.md
│   │   ├── schelling-segregation-model.md
│   │   └── sevetys.md
│   ├── contact.json         # Contact information data
│   ├── hobbies.md           # Hobbies page content
│   ├── index.md             # Home page content
│   ├── languages.json       # Programming languages data
│   ├── skills.json          # Skills and expertise data
│   └── uses.md              # Tools and software used
├── public/                  # Public static files
├── server/                  # Server API routes and middleware
│   ├── api/                 # API endpoints
│   └── routes/              # Server routes
├── types/                   # TypeScript type definitions
├── .env.example             # Example environment variables
├── content.config.ts        # Content module configuration
├── nuxt.config.ts           # Nuxt configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── wrangler.jsonc           # Cloudflare Workers configuration
└── README.md                # Project documentation
```

## 🔌 Integrations

- **WakaTime** - Track coding time and statistics
- **Discord** - Display real-time Discord status
- **Nuxt Studio** - Headless CMS for content management
- **Nuxt i18n** - Internationalization support
- **NuxtHub** - CI/CD and deployment platform
- **Cloudflare D1** - Serverless SQL database

## 🚢 Deployment

This project is configured to deploy on Cloudflare using NuxtHub.

### Deploy to Production

1. **Prerequisites**
   - Cloudflare account
   - Wrangler CLI configured (`wrangler login`)
   - NuxtHub project created

2. **Deploy**

   ```bash
   bun run deploy
   ```

   This will:
   - Generate Cloudflare types
   - Build the application
   - Deploy to Cloudflare Workers

### Automatic Deployments

The project is set up with NuxtHub for automatic deployments on push to the main branch.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style (enforced by ESLint)
- Use TypeScript for type safety
- Write descriptive commit messages
- Test your changes locally before submitting
- Update documentation if needed

## 📄 License

[MIT](./LICENSE) © Arthur Danjou

## 📬 Contact

- Website: [arthurdanjou.fr](https://arthurdanjou.fr)
- GitHub: [@ArthurDanjou](https://github.com/ArthurDanjou)
- LinkedIn: [Arthur Danjou](https://linkedin.com/in/arthurdanjou)
