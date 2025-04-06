<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local',
})

useSeoMeta({
  title: 'Things I use',
  description: t('description'),
})

const { data: items } = await useAsyncData('uses', async () => await queryCollection('uses').all())

const hardware = items.value!.filter(item => item.category === 'hardware')
const software = items.value!.filter(item => item.category === 'software')
const ide = items.value!.filter(item => item.category === 'ide')
const stack = items.value!.filter(item => item.category === 'stack')

const photos = [
  {
    src: '/uses/jetbrains.webp',
    caption: 'caption.jetbrains',
  },
  {
    src: '/uses/cursor.webp',
    caption: 'caption.cursor',
  },
  {
    src: '/uses/pycharm.webp',
    caption: 'caption.pycharm',
  },
  {
    src: '/uses/datagrip.webp',
    caption: 'caption.datagrip',
  },
]
</script>

<template>
  <main>
    <AppTitle
      :description="t('description')"
      :title="t('title')"
    />
    <div class="mt-12 space-y-12">
      <UsesList :title="t('hardware')">
        <UsesItem
          v-for="(item, id) in hardware"
          :key="id"
          :item="item"
        />
      </UsesList>
      <UsesList :title="t('software')">
        <UsesItem
          v-for="(item, id) in software"
          :key="id"
          :item="item"
        />
      </UsesList>
      <ul class="space-y-8">
        <USeparator
          :label="t('ide')"
          size="xs"
        />
        <div class="relative">
          <UCarousel
            v-slot="{ item }"
            arrows
            loop
            class="rounded-lg"
            :autoplay="{ delay: 4000 }"
            :items="photos"
            prev-icon="i-lucide-chevron-left"
            next-icon="i-lucide-chevron-right"
          >
            <ProseImg
              rounded
              :src="item.src"
              :label="t(item.caption)"
              :caption="t(item.caption)"
            />
          </UCarousel>
        </div>
        <UsesItem
          v-for="(item, id) in ide"
          :key="id"
          :item="item"
        />
      </ul>
      <UsesList :title="t('stack')">
        <UsesItem
          v-for="(item, id) in stack"
          :key="id"
          :item="item"
        />
      </UsesList>
    </div>
  </main>
</template>

<i18n lang="json">
{
  "en": {
    "title": "My uses",
    "description": "Software I use, gadgets I love, and other things I recommend. Here’s a big list of all of my favorite stuff.",
    "hardware": "Hardware",
    "software": "Software",
    "ide": "IDE & Font",
    "stack": "Stack",
    "caption": {
      "jetbrains": "My IntelliJ IDE",
      "cursor": "My Cursor IDE",
      "pycharm": "My PyCharm IDE",
      "datagrip": "My DataGrip IDE"
    }
  },
  "fr": {
    "title": "Mes usages",
    "description": "Logiciels que j'utilise, gadgets que j'adore et autres choses que je recommande. Voici une grande liste de toutes mes choses préférées.",
    "hardware": "Matériel",
    "software": "Logiciel",
    "ide": "IDE & Police",
    "stack": "Stack",
    "caption": {
      "jetbrains": "Mon IDE IntelliJ Idea Ultimate",
      "cursor": "Mon IDE Cursor",
      "pycharm": "Mon IDE PyCharm",
      "datagrip": "Mon IDE DataGrip"
    }
  },
  "es": {
    "title": "Mis aplicaciones.",
    "description": "Los programas que utilizo, los gadgets que adoro y otras cosas que recomiendo. Aquí te hago una lista de todas mis cosas preferidas. ",
    "hardware": "Material",
    "software": "Programas",
    "ide": "IDE y Fuente",
    "stack": "Stack",
    "caption": {
      "jetbrains": "Mi IDE IntelliJ Idea Ultimate",
      "cursor": "Mi IDE Cursor",
      "pycharm": "Mi IDE PyCharm",
      "datagrip": "Mi IDE DataGrip"
    }
  }
}
</i18n>
