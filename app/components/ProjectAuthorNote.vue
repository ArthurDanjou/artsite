<script setup lang="ts">
defineProps<{
  note: string
}>()

const signature = useTemplateRef('signature')
const hasBeenVisible = ref(false)

const { stop } = useIntersectionObserver(signature, ([entry]) => {
  if (entry?.isIntersecting) {
    hasBeenVisible.value = true
    stop()
  }
}, { threshold: 0.5 })
</script>

<template>
  <UCard
    as="aside"
    variant="subtle"
    aria-labelledby="author-note-title"
    :ui="{ body: 'space-y-5 p-6 sm:p-8' }"
  >
    <h2
      id="author-note-title"
      class="flex items-center gap-2 text-sm font-semibold text-highlighted"
    >
      <UIcon
        name="i-ph-pen-nib-duotone"
        class="size-5 text-muted"
      />
      A note from the author
    </h2>

    <p class="whitespace-pre-line text-base leading-relaxed text-toned">
      {{ note.trim() }}
    </p>

    <div
      ref="signature"
      class="w-fit text-2xl text-muted"
    >
      <AppSignature
        animated
        :playing="hasBeenVisible"
      />
    </div>
  </UCard>
</template>
