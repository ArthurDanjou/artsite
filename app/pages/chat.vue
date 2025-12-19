<script lang="ts" setup>
import { getTextFromMessage } from '@nuxt/ui/utils/ai'
import { DefaultChatTransport } from 'ai'
import { Chat } from '@ai-sdk/vue'

const toast = useToast()
const input = ref('')

const { t, locale } = useI18n({ useScope: 'local' })

const chat = new Chat({
  transport: new DefaultChatTransport({
    api: '/api/chat',
    body: () => ({
      messages: chat.messages,
      lang: locale.value
    })
  }),
  onError(error) {
    toast.add({
      title: 'Error',
      description: error.message,
      color: 'red'
    })
  }
})

function handleSubmit(e: Event) {
  e.preventDefault()
  if (input.value.trim()) {
    chat.sendMessage({ text: input.value })
    input.value = ''
  }
}

const clipboard = useClipboard()
const actions = ref([
  {
    label: 'Copy to clipboard',
    icon: 'i-lucide-copy',
    onClick: (message: never) => clipboard.copy(getTextFromMessage(message))
  }
])
</script>

<template>
  <main>
    <UDashboardPanel
      :ui="{ body: 'p-0 sm:p-0' }"
      class="max-h-[calc(100vh-28rem)]! min-h-[calc(100vh-28rem)]! border-none"
      :resizable="false"
    >
      <template #body>
        <UContainer>
          <UChatMessages
            :actions
            :messages="chat.messages"
            :status="chat.status"
            :user="{
              variant: 'solid'
            }"
            :assistant="{
              variant: 'naked'
            }"
            :auto-scroll="{
              color: 'neutral',
              variant: 'outline'
            }"
          >
            <template #indicator>
              <UButton
                class="px-0"
                color="neutral"
                variant="link"
                loading
                loading-icon="i-lucide-loader"
                label="Thinking..."
              />
            </template>
            <template #content="{ message }">
              <MDC
                :value="getTextFromMessage(message)"
                :cache-key="message.id"
                class="*:first:mt-0 *:last:mb-0"
              />
            </template>
          </UChatMessages>
        </UContainer>
      </template>

      <template #footer>
        <UContainer>
          <ClientOnly>
            <UCard
              variant="outline"
              class="rounded-xl"
              :ui="{ body: 'p-2 sm:p-2' }"
            >
              <UChatPrompt
                v-model="input"
                :placeholder="t('placeholder')"
                :error="chat.error"
                @submit="handleSubmit"
              >
                <UChatPromptSubmit
                  :status="chat.status"
                  color="neutral"
                  submitted-color="neutral"
                  submitted-variant="subtle"
                  submitted-icon="i-lucide-square"
                  streaming-color="neutral"
                  streaming-variant="subtle"
                  streaming-icon="i-lucide-square"
                  error-color="red"
                  error-variant="soft"
                  error-icon="i-lucide-rotate-ccw"
                  @stop="chat.stop()"
                  @reload="chat.regenerate()"
                />
              </UChatPrompt>
            </UCard>
          </ClientOnly>
        </UContainer>
      </template>
    </UDashboardPanel>
  </main>
</template>

<style scoped>

</style>

<i18n lang="json">
{
  "en": {
    "placeholder": "Type your message...",
    "thinking": "Thinking..."
  },
  "fr": {
    "placeholder": "Tapez votre message...",
    "thinking": "Réflexion..."
  },
  "es": {
    "placeholder": "Escribe tu mensaje...",
    "thinking": "Pensando..."
  }
}
</i18n>
