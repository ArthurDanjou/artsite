---
slug: artsite
title: ArtSite - Personal Research Hub
type: Personal Project
description: My digital headquarters. A high-performance portfolio built on the Edge using the full Nuxt ecosystem, deployed to Cloudflare Workers via Wrangler.
shortDescription: A modern portfolio and experimental lab built on the Nuxt ecosystem and deployed to Cloudflare Workers.
publishedAt: 2024-06-01
readingTime: 2
favorite: true
status: Active
tags:
  - Nuxt
  - NuxtHub
  - Cloudflare Workers
  - TypeScript
icon: i-ph-globe-hemisphere-west-duotone
---

[**ArtSite**](https://go.arthurdanjou.fr/website) is my digital headquarters: a unified platform that serves as my engineering portfolio and experimental lab.

More than a static site, it is a modern **Portfolio** designed to be fast, accessible, and type-safe. It also acts as a live production environment where I test the latest frontend technologies and Edge computing paradigms.

::BackgroundTitle{title="The Nuxt Stack Architecture"}
::

This project is built entirely on the **Nuxt ecosystem**, leveraging module synergy for strong developer experience and performance.

### Core Engine
- **[Nuxt 3](https://nuxt.com/)**: The meta-framework providing the backbone (SSR, auto-imports, modules).
- **[Nitro](https://nitro.unjs.io/)**: The high-performance server engine powering API routes and Edge rendering.

### Infrastructure & Deployment
- **[Cloudflare Workers](https://workers.cloudflare.com/)**: The application runs entirely on Cloudflare's global serverless network (SSR), delivering low latency and high resilience.
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)**: The command-line tool used for deployment pipelines and worker configuration.
- **[NuxtHub](https://hub.nuxt.com/)**: Integrated for **advanced cache management** and to unify Cloudflare platform features (KV, D1, Blob) within the Nuxt runtime.

### Content & Data
- **[Nuxt Content](https://content.nuxtjs.org/)**: A Git-based headless CMS that treats Markdown as a database.
- **[Nuxt Studio](https://nuxt.studio)**: A live visual editor for seamless content management directly from the browser.

### Interface & Design
- **[Nuxt UI](https://nuxtui.com/)**: A comprehensive component library built on Headless UI and Tailwind CSS.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first styling for rapid, responsive design.

### Quality Assurance
- **[TypeScript](https://www.typescriptlang.org/)**: Strict type safety across the entire stack (frontend and backend).
- **[Zod](https://zod.dev/)**: Runtime schema validation for API inputs and environment variables.
