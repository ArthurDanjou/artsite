<script lang="ts" setup>
defineProps<{
  title: string
  description: string
  icon?: string
  tags?: string[]
  favorite?: boolean
  status?: string
  to: string
  lang?: string
}>()

const flags: Record<string, string> = {
  fr: '🇫🇷',
  en: '🇬🇧'
}
</script>

<template>
  <NuxtLink
    :to="to"
    :aria-label="`Open project: ${title}`"
  >
    <UCard
      variant="subtle"
      class="hover:bg-[#8881] dark:hover:bg-neutral-700/20 transition-colors duration-500"
    >
      <div class="flex items-start gap-4">
        <div class="mt-0.5 shrink-0">
          <UIcon
            :name="icon || 'i-ph-folder-duotone'"
            class="text-primary size-6"
          />
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h3 class="font-semibold text-neutral-900 dark:text-white">
              {{ title }}
            </h3>
            <span
              v-if="lang && flags[lang]"
              class="text-sm shrink-0"
            >{{ flags[lang] }}</span>
          </div>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
            {{ description }}
          </p>
          <div class="flex flex-wrap items-center gap-2 mt-3">
            <div
              v-if="tags?.length"
              class="flex flex-wrap gap-1.5"
            >
              <UBadge
                v-for="tag in tags"
                :key="tag"
                color="neutral"
                variant="outline"
                size="xs"
              >
                {{ tag }}
              </UBadge>
            </div>
            <UBadge
              v-if="favorite"
              color="amber"
              variant="subtle"
              size="sm"
              icon="i-ph-star-four-duotone"
            />
            <UBadge
              v-if="status === 'In progress'"
              color="blue"
              variant="soft"
              size="sm"
              icon="i-ph-hourglass-duotone"
            />
            <UBadge
              v-if="status === 'Archived'"
              color="gray"
              variant="soft"
              size="sm"
              icon="i-ph-archive-duotone"
            />
          </div>
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>
