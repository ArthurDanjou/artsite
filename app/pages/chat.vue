<script lang="ts" setup>
import { ref } from 'vue'
import { useChat } from 'ai/vue'

useSeoMeta({
  title: 'Chat - Arthur Danjou',
  description: 'Chat with AI about Arthur Danjou\'s work, projects, and expertise',
})

const { messages, input, handleSubmit, isLoading } = useChat({
  api: '/api/chat',
})
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Chat with Arthur Danjou AI Assistant</h1>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 min-h-[500px] max-h-[600px] overflow-y-auto">
      <div v-if="messages.length === 0" class="text-gray-500 dark:text-gray-400 text-center py-12">
        <p class="text-lg mb-2">👋 Hello! Ask me anything about Arthur Danjou.</p>
        <p class="text-sm">I can help with questions about his projects, skills, experience, and more.</p>
      </div>
      
      <div v-for="message in messages" :key="message.id" class="mb-4">
        <div
          :class="{
            'flex justify-end': message.role === 'user',
            'flex justify-start': message.role === 'assistant',
          }"
        >
          <div
            :class="{
              'bg-blue-500 text-white': message.role === 'user',
              'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100': message.role === 'assistant',
            }"
            class="rounded-lg px-4 py-2 max-w-[80%] break-words"
          >
            <div class="font-semibold text-xs mb-1 opacity-75">
              {{ message.role === 'user' ? 'You' : 'Assistant' }}
            </div>
            <div class="prose dark:prose-invert prose-sm max-w-none">
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="isLoading" class="flex justify-start mb-4">
        <div class="bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2">
          <div class="flex space-x-2">
            <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
            <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
            <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
          </div>
        </div>
      </div>
    </div>
    
    <form @submit="handleSubmit" class="flex gap-2">
      <input
        v-model="input"
        :disabled="isLoading"
        type="text"
        placeholder="Ask about Arthur Danjou..."
        class="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
      <button
        type="submit"
        :disabled="isLoading || !input.trim()"
        class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold px-6 py-2 rounded-lg transition-colors disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  </main>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5rem);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>