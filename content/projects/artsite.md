---
slug: artsite
title: ArtSite - Personal Research Hub
type: Personal Project
description: My digital headquarters. A high-performance portfolio built on the Edge using the full Nuxt ecosystem, deployed to Cloudflare Workers via Wrangler.
shortDescription: A modern portfolio and experimental lab built on the Nuxt ecosystem and deployed to Cloudflare Workers.
authorNote: |
  I use this site both to share my work and to try out the tools I build with. It is a working project in its own right, with the same deployment and maintenance concerns as the other applications I develop.

  As my projects and research evolve, this is where I keep a record of them.
publishedAt: 2024-06-01
readingTime: 2
favorite: true
status: Active
tags:
  - TypeScript
  - Nuxt
icon: i-ph-globe-hemisphere-west-duotone
summary:
  role: "Design, development and deployment of this portfolio."
  context: "A personal research hub and a production environment for frontend experiments."
  outcome: "A Nuxt portfolio with Markdown content, deployed to Cloudflare Workers."
  links:
    - label: "Website"
      url: "https://links.arthurdanjou.fr/website"
      icon: i-ph-arrow-square-out-duotone
---

[**ArtSite**](https://links.arthurdanjou.fr/website) is my digital headquarters: my engineering portfolio and experimental lab.

It is a modern **Portfolio** designed to be fast, accessible, and type-safe. It is also a live production environment where I test the latest frontend technologies and Edge computing paradigms.

## The Nuxt Stack Architecture

This project is built entirely on the **Nuxt ecosystem**, whose modules work well together for a strong developer experience and performance.

### Core Engine
- **[Nuxt 4](https://nuxt.com/)**: The meta-framework providing the backbone (SSR, auto-imports, modules).
- **[Nitro](https://nitro.unjs.io/)**: The high-performance server engine powering API routes and Edge rendering.

### Infrastructure & Deployment
- **[Cloudflare Workers](https://workers.cloudflare.com/)**: The application runs entirely on Cloudflare's global serverless network (SSR), with low latency and high resilience.
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)**: The command-line tool used for deployment pipelines and worker configuration.
- **[NuxtHub](https://hub.nuxt.com/)**: Integrated for **advanced cache management** and to unify Cloudflare platform features (KV, D1, Blob) within the Nuxt runtime.

### Content & Data
- **[Nuxt Content](https://content.nuxtjs.org/)**: A Git-based headless CMS that treats Markdown as a database.
- **[Nuxt Studio](https://nuxt.studio)**: A live visual editor for content management directly from the browser.

### Interface & Design
- **[Nuxt UI](https://nuxtui.com/)**: A component library built on Headless UI and Tailwind CSS.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first styling for rapid, responsive design.

### Quality Assurance
- **[TypeScript](https://www.typescriptlang.org/)**: Strict type safety across the entire stack (frontend and backend).
- **[Zod](https://zod.dev/)**: Runtime schema validation for API inputs and environment variables.
