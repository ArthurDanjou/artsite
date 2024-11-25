---
slug: how-my-website-works
title: How my website works?
description: My new website is using a fantastical stack and I am explaining how my playground works
publishedAt: 2024/06/21
readingTime: 5
tags: [article, dev]
---

My personal website is an overengineered playground where I tinker, explore new technologies, experiment with tools, break conventional rules, and satisfy my deep curiosity about web software.

While it's still fresh in my mind, I wanted to document how this version of the site works, the tools I used to build it, and the challenges I overcame to bring it to its current state.

![Website](/portfolio/how-my-website-works/website.png)

## Ideas and Goals

Most of the time, I work on my site for fun and without any profit motive. However, while building this latest version, I managed to keep a few key ideas and goals in mind:

### Reduce writing friction

This new version of my website was built with the idea that I should be able to add, edit, and delete content directly from the front-end. This means that everything needs to be backed by a database or CMS, which quickly adds complexity. But at the end of the day, adding a bookmark should be a matter of pasting a URL and clicking save. Writing a blog post should be a matter of typing some Markdown and clicking publication.

Extra friction on these processes would make me less likely to keep things up to date or share new things.

### A playground for ideas

I want my website to be a playground where I can safely experiment with new technologies and packages, including testing frameworks (like the new Nuxt 3 stack), improving CSS styles with Tailwind, and discovering new technologies and frameworks, in a way that allows for easy isolation and deletion. This requirement made Nuxt.js an obvious choice, thanks to its support for hybrid page rendering strategies—static, server-rendered, or client-rendered. More on this below.

### Fast

The new version of my website is faster than the old one, thanks to the latest version of Nuxt. This improvement enhances the overall user experience and ensures that the site remains responsive and efficient.

## FrontEnd & BackEnd with Nuxt 3

I wanted this version of my site to reflect my personality, especially because it seemed like a fun project! What would a 'personal application' look like, showcasing everything I've created? I aimed for a clean, monochrome design with plenty of 'Easter eggs' to keep things interesting.

### Nuxt 3

Nuxt.js is my front-end framework of choice. I particularly appreciate it for its comprehensive and complementary Vue and Nuxt ecosystem. The filesystem-based router provides an intuitive and powerful abstraction for building the route hierarchy. Nuxt.js also benefits from a large community that has thoroughly tested the framework, addressing edge cases and developing creative solutions for common Vue, data recovery, and performance issues. Whenever I encounter a problem, I turn to the Nuxt.js discussions on [GitHub](https://github.com/nuxt) or their [Discord server](https://go.nuxt.com/discord). Almost every time, I find that others have already come up with innovative solutions to similar challenges.

Nuxt.js is also fast. It optimizes performance by speeding up local builds, automatically compressing static assets, and ensuring quick deployment times. The regular project updates mean my site continually gets faster over time—at no extra cost!

### Styling

#### Tailwind CSS

Tailwind is my favorite CSS authoring tool... ever. It's incredibly effective. I often see debates on Twitter about whether Tailwind is the best or worst thing ever, and I prefer not to engage in that discussion. Here's my take:

Tailwind is a toolkit that makes everything great by default and fast. The magic lies in its token system and the default values built into the framework. Once I grasped the semantics of Tailwind, I was able to style my tags at the speed of thought.

Tailwind provides everything I need out of the box, but I've gradually added a bit of custom CSS to make things more unique.

#### Nuxt UI

Nuxt UI is a new tool I've been using since its release to enhance and streamline my Nuxt projects. It’s a module that offers a collection of Vue components and composables built with Tailwind CSS and Headless UI, designed to help you create beautiful and accessible user interfaces.

Nuxt UI aims to provide everything you need for the UI when building a Nuxt app, including components, icons, colors, dark mode, and keyboard shortcuts. It's an excellent tool for both beginners and experienced developers.

### Database & Deployment

#### NuxtHub & Cloudflare workers

![NuxtHub](/portfolio/how-my-website-works/nuxt-hub.png)

NuxtHub is an innovative deployment and management platform tailored for Nuxt, leveraging the power of Cloudflare. Deploy your application effortlessly with database, key-value, and blob storage—all configured seamlessly within your Cloudflare account.

NuxtHub enables cost-effective hosting of high-performance Nuxt applications across multiple environments. It simplifies the process of launching your app swiftly, eliminating concerns about server setup or complex deployment pipelines with just a single command.

#### Drizzle

Drizzle is a unique ORM that offers both relational and SQL-like query APIs, combining the best of both worlds for accessing relational data. Lightweight, performant, typesafe, and designed to be serverless-ready, Drizzle is also flexible and gluten-free—delivering a sober and seamless experience.

Drizzle isn't just a library; it's an exceptional journey 🤩. It empowers you to build your project without imposing on your structure or workflow. With Drizzle, you can define and manage database schemas in TypeScript, access your data using SQL-like or relational methods, and use optional tools to enhance your development experience significantly.

One word : `If you know SQL — you know Drizzle.`

### Writing

#### Nuxt Studio

![Nuxt Studio](/portfolio/how-my-website-works/nuxt-studio.png)

Nuxt Studio introduces a fresh editing experience for your Nuxt Content website, providing limitless customization and a user-friendly interface. Edit your website effortlessly with our editor reminiscent of Notion, fostering seamless collaboration between developers and copywriters. It offers a rich text editor, markdown support, and a live preview, enabling you to create and edit content with ease.

#### Markdown

I've abandoned using rich text editors on the web. They're overly complex, each with its own intricate abstractions for blocks and elements. To avoid another major rewrite soon I've sought the simplest, most straightforward solution for publishing content on my site: plain text.

The article you're currently reading is plain text stored in MySQL, rendered using vue-markdown. You can view my custom element renderings here. I enhance my Markdown capabilities by employing plugins like remark-gfm, which add support for tables, strikethrough, footnotes, and other features.

Compromises are inevitable! I've chosen to sacrifice some features for simplicity and speed. I'm content with my decision, as it aligns with my goal of reducing friction in the writing process.

## How much everything costs

I'm often asked how much it costs to run my website. Here's a breakdown of the costs:

- NuxtHub: 0€
- Cloudflare Workers: 0€
- Nuxt Studio: 0€

Total: 0€ thanks to nuxt free plan and cloudflare free plan

## Thanks

I want to thank the Nuxt team for their hard work and dedication to the project. I also want to thank the community for their support and for providing me with the tools I needed to build this site. I want to add a special thanks to [Estéban](https://x.com/soubiran_) for solving `All` my problems and for inspiring me to rewrite my website.
