<script setup lang="ts">
interface Heading {
  id: string
  text: string
  level: number
  element: HTMLElement
}

const props = defineProps<{
  content: HTMLElement | null
}>()

const headings = shallowRef<Heading[]>([])
const activeId = ref('')
const isOpen = ref(false)
const root = useTemplateRef('root')
const trigger = useTemplateRef('trigger')
const panel = useTemplateRef('panel')

function updateActiveHeading() {
  let active = headings.value[0]
  for (const heading of headings.value) {
    if (heading.element.getBoundingClientRect().top > 120) break
    active = heading
  }
  activeId.value = active?.id ?? ''
}

function collectHeadings() {
  const elements = props.content?.querySelectorAll<HTMLElement>('h2, h3[id]') ?? []
  headings.value = [...elements]
    .filter(element => !element.closest('aside, .not-prose') && element.textContent?.trim())
    .map((element, index) => {
      const text = element.textContent!.trim()
      if (!element.id) {
        const slug = text.toLowerCase().normalize('NFKD')
          .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        const base = `section-${slug || index + 1}`
        let id = base
        let suffix = 2
        while (document.getElementById(id)) id = `${base}-${suffix++}`
        element.id = id
      }
      return { id: element.id, text, level: Number(element.tagName[1]), element }
    })
  updateActiveHeading()
}

async function toggle() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    await nextTick()
    panel.value?.querySelector<HTMLElement>('[aria-current="location"]')?.focus({ preventScroll: true })
  }
}

function close(restoreFocus = false) {
  isOpen.value = false
  if (restoreFocus) trigger.value?.focus()
}

function onPointerEnter(event: PointerEvent) {
  if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1280px) and (hover: hover)').matches) {
    isOpen.value = true
  }
}

function onPointerLeave() {
  if (window.matchMedia('(min-width: 1280px) and (hover: hover)').matches
    && !root.value?.contains(document.activeElement)) close()
}

function onFocusOut(event: FocusEvent) {
  if (event.relatedTarget && !root.value?.contains(event.relatedTarget as Node)) close()
}

function navigate(heading: Heading) {
  close()
  heading.element.setAttribute('tabindex', '-1')
  heading.element.focus({ preventScroll: true })
}

onClickOutside(root, () => close())
watch(isOpen, async (open) => {
  if (!open) return
  await nextTick()
  const active = panel.value?.querySelector<HTMLElement>('[aria-current="location"]')
  if (active && panel.value) {
    panel.value.scrollTop = Math.max(0, active.offsetTop - panel.value.clientHeight / 2)
  }
})
useEventListener('scroll', updateActiveHeading, { passive: true })
useEventListener('resize', updateActiveHeading)
watch(() => props.content, () => {
  close()
  collectHeadings()
}, { immediate: true, flush: 'post' })
</script>

<template>
  <div
    v-if="headings.length > 1"
    ref="root"
    class="fixed right-[calc(1rem+env(safe-area-inset-right))] bottom-[calc(5rem+env(safe-area-inset-bottom))] z-60 xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @focusout="onFocusOut"
    @keydown.esc.stop.prevent="close(true)"
  >
    <button
      ref="trigger"
      type="button"
      aria-label="Table of contents"
      aria-controls="page-table-of-contents"
      :aria-expanded="isOpen"
      class="flex min-h-11 w-11 flex-col items-end justify-center gap-1.5 rounded-md bg-default/90 px-2 py-3 text-muted hover:text-highlighted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
      @click="toggle"
    >
      <span
        v-for="heading in headings"
        :key="heading.id"
        aria-hidden="true"
        class="block h-0.5 shrink-0 rounded-full motion-safe:transition-[width,background-color] motion-safe:duration-200"
        :class="[
          heading.id === activeId ? 'w-7 bg-inverted' : 'bg-neutral-300 dark:bg-neutral-700',
          heading.id !== activeId && (heading.level === 2 ? 'w-5' : 'w-3')
        ]"
      />
    </button>

    <nav
      v-if="isOpen"
      id="page-table-of-contents"
      ref="panel"
      aria-label="On this page"
      class="absolute right-full bottom-0 max-h-[min(70dvh,calc(100dvh-6rem-env(safe-area-inset-bottom)))] w-[min(18rem,calc(100vw-4rem))] overflow-y-auto overscroll-contain rounded-lg border border-neutral-200 dark:border-default bg-default p-2 shadow-lg xl:bottom-auto xl:top-1/2 xl:max-h-[70dvh] xl:-translate-y-1/2"
    >
      <div class="sticky -top-2 flex items-center justify-between gap-3 bg-default px-3 py-2">
        <p class="text-xs font-medium uppercase tracking-wide text-muted">
          On this page
        </p>
        <button
          type="button"
          aria-label="Close table of contents"
          class="flex size-8 items-center justify-center rounded-md text-muted hover:bg-elevated hover:text-highlighted focus-visible:outline-2 focus-visible:outline-inverted xl:hidden"
          @click="close(true)"
        >
          <UIcon
            name="i-ph-x"
            class="size-4"
          />
        </button>
      </div>
      <ul>
        <li
          v-for="heading in headings"
          :key="heading.id"
        >
          <a
            :href="`#${heading.id}`"
            :aria-current="heading.id === activeId ? 'location' : undefined"
            class="block rounded-md py-2 pr-3 text-sm leading-snug hover:bg-elevated hover:text-highlighted focus-visible:outline-2 focus-visible:outline-inverted"
            :class="[
              heading.level === 3 ? 'pl-6' : 'pl-3',
              heading.id === activeId ? 'font-medium text-highlighted' : 'text-muted'
            ]"
            @click="navigate(heading)"
          >
            {{ heading.text }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
