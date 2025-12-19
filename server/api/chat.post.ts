import { defineEventHandler, readValidatedBody } from 'h3'
import { z } from 'zod'
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText
} from 'ai'
import type { UIMessage } from 'ai'
import { createWorkersAI } from 'workers-ai-provider'
import { statsTool } from '~~/shared/utils/tools/stats'
import { activityTool } from '~~/shared/utils/tools/activity'
import { resumesTool } from '~~/shared/utils/tools/read-resume'
import { resourceTool } from '~~/shared/utils/tools/read-resources'
import { statusPageTool } from '~~/shared/utils/tools/status-page'
import { usesByCategoryTool } from '~~/shared/utils/tools/uses-by-category'

export default defineEventHandler(async (event) => {
  const { messages, lang } = await readValidatedBody(event, z.object({
    messages: z.array(z.custom<UIMessage>()),
    lang: z.string().optional()
  }).parse)

  const { AI } = event.context.cloudflare.env || {}

  if (!AI) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Cloudflare AI Binding not found. Check wrangler.json.'
    })
  }

  const validCategories = ['contact', 'education', 'experiences', 'hobbies', 'languages', 'profile', 'projects', 'skills', 'uses'].join(', ')

  const workersAI = createWorkersAI({ binding: AI })

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const result = streamText({
        model: workersAI('@cf/meta/llama-3-8b-instruct'),
        system: `You are Arthur Danjou's personal portfolio assistant (Data Science Student).
        
        ### TOOL USAGE GUIDE - FOLLOW STRICTLY:

        1. **readResources(category)**: YOUR PRIMARY BRAIN.
            - Use this for ANY question about Arthur's life, background, or work.
            - Categories: ${validCategories}.
            - Example: "What are his skills?" -> call readResources('skills').
            - Example: "Where did he study?" -> call readResources('education').

        2. **readResume()**: THE FILE DISPENSER.
           - **WARNING:** This tool ONLY returns a direct DOWNLOAD LINK (URL). It does NOT contain text.
           - **WHEN TO USE:** ONLY when the user explicitly asks to "download", "get", "see", or "have" the CV/Resume file.
           - **DO NOT USE:** If the user asks "What is on his resume?" or "Describe his experience", DO NOT use this. Use 'readResources' instead.

        3. **stats()**: GITHUB METRICS.
            - Use this for questions about coding volume, commit streaks, languages used percentages, or GitHub activity.
        
        4. **activity()**: LIVE STATUS.
            - Use this to know what Arthur is doing RIGHT NOW (e.g., "Is he coding?", "What is he listening to on Spotify?").
        
        5. **statusPage()**: INFRASTRUCTURE HEALTH.
            - Use this if the user asks about the website's uptime, server status, or if services are down.

        6. **usesByCategory()**: TECH STACK & GEAR.
            - Use this for specific questions about his hardware (Mac vs PC), software, developer tools, or desk setup.

        ### GENERAL RULES:
        - If you don't call a tool, you know NOTHING. Do not hallucinate.
        - Always answer in ${lang || 'English'}.
        - Be concise and professional.
        `,
        tools: {
          stats: statsTool,
          activity: activityTool,
          readResume: resumesTool,
          readResources: resourceTool,
          statusPage: statusPageTool,
          usesByCategory: usesByCategoryTool
        },
        messages: await convertToModelMessages(messages)
      })

      writer.merge(result.toUIMessageStream())
    }
  })

  return createUIMessageStreamResponse({ stream })
})
