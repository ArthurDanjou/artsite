<script setup lang="ts">
import type { PublicLink } from '~~/types/links'
import { shortLinkUrl } from '~~/shared/links'
import { CARD_HOVER_CLASS } from '~/utils/cards'

const props = defineProps<{
  link: PublicLink
}>()

const href = computed(() => shortLinkUrl(props.link.slug))
</script>

<template>
  <NuxtLink
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`Open ${link.title}`"
    class="group block h-full rounded-lg p-4 transition-colors duration-300"
    :class="CARD_HOVER_CLASS"
  >
    <div class="flex items-start gap-4">
      <div class="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-400/10">
        <UIcon
          :name="link.icon || 'i-ph-link-duotone'"
          class="text-primary size-5"
        />
      </div>

      <div class="min-w-0">
        <p
          v-if="link.label"
          class="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500"
        >
          {{ link.label }}
        </p>
        <div class="flex items-center gap-2">
          <h3 class="font-semibold text-neutral-900 dark:text-white line-clamp-1">
            {{ link.title }}
          </h3>
          <UBadge
            v-if="link.featured"
            color="amber"
            variant="subtle"
            size="sm"
            icon="i-ph-star-four-duotone"
          />
        </div>
        <p
          v-if="link.description"
          class="mt-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2"
        >
          {{ link.description }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
