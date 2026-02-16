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

## Header

- **Projet :** ArtSite - Personal Research Hub
- **Date / période estimée :** 2024-06-01
- **Tags / technos :** Nuxt, NuxtHub, Cloudflare Workers, TypeScript

## Context & Goal

ArtSite est conçu comme hub personnel mêlant portfolio en production et terrain d'expérimentation autour du web moderne et de l'Edge.

## Methodology/Stack

Stack full Nuxt (Nuxt/Nitro/Content/UI), déploiement Cloudflare Workers via Wrangler/NuxtHub, avec TypeScript et Zod pour la robustesse des interfaces et des APIs.

## Key Results

Le site sert à la fois de vitrine et de laboratoire technique, avec un socle orienté performance, accessibilité et itérations rapides.

## Status & Evolution

**État actuel : Active.** Le projet continue d'évoluer avec de nouveaux modules Nuxt et des expérimentations Edge en conditions réelles.


## Notes additionnelles

[**ArtSite**](https://go.arthurdanjou.fr/website) is my digital headquarters—a unified platform serving as my engineering portfolio and experimental lab. 

More than just a static site, it is a modern **Portfolio** designed to be fast, accessible, and type-safe. It serves as a live production environment where I experiment with the latest frontend technologies and Edge computing paradigms.

## ⚡ The Nuxt Stack Architecture

This project is built entirely on the **Nuxt ecosystem**, leveraging the synergy between its modules for maximum developer experience and performance.

### Core Engine
- **[Nuxt 3](https://nuxt.com/)**: The meta-framework providing the backbone (SSR, Auto-imports, Modules).
- **[Nitro](https://nitro.unjs.io/)**: The high-performance server engine that powers the API routes and renders the app at the Edge.

### Infrastructure & Deployment
- **[Cloudflare Workers](https://workers.cloudflare.com/)**: The application runs entirely on Cloudflare's global serverless network (SSR), ensuring minimal latency and high resilience.
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)**: The command-line tool used for precise deployment pipelines and worker configuration.
- **[NuxtHub](https://hub.nuxt.com/)**: Integrated specifically for **advanced cache management** and unifying Cloudflare platform features (KV, D1, Blob) within the Nuxt runtime.

### Content & Data
- **[Nuxt Content](https://content.nuxtjs.org/)**: A Git-based Headless CMS that treats Markdown as a database.
- **[Nuxt Studio](https://nuxt.studio)**: A live visual editor allowing for seamless content management directly from the browser.

### Interface & Design
- **[Nuxt UI](https://nuxtui.com/)**: A comprehensive component library built on Headless UI and Tailwind CSS.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first styling for rapid and responsive design.

### Quality Assurance
- **[TypeScript](https://www.typescriptlang.org/)**: Strict type safety across the entire stack (Frontend & Backend).
- **[Zod](https://zod.dev/)**: Runtime schema validation for API inputs and environment variables.
