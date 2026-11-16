import type { H3Event } from 'h3'

interface MarkdownSourceContext {
  route: string
  event: H3Event
  source: { markdown: string, title?: string, description?: string, updatedAt?: string } | null
}

interface MarkdownContext {
  markdown: string
  route: string
  isPrerender?: boolean
}

interface MdreamConfig {
  filter?: { exclude?: string[] }
}

interface PageIndexedContext {
  contentChanged?: boolean
  route: string
}

// nuxt-ai-ready generates these augmentations into .nuxt/nuxt.d.ts, which the
// app tsconfig loads but the server tsconfig does not. Declare them here so the
// runtime hooks used by the Nitro plugins are typed in server files too.
declare module 'nitropack/types' {
  interface NitroRuntimeHooks {
    'ai-ready:markdown:source': (context: MarkdownSourceContext) => void | Promise<void>
    'ai-ready:mdreamConfig': (config: MdreamConfig) => void | Promise<void>
    'ai-ready:page:markdown': (context: MarkdownContext) => void | Promise<void>
    'ai-ready:page:indexed': (context: PageIndexedContext) => void | Promise<void>
  }
}

export {}
