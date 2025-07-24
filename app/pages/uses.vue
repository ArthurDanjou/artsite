<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local',
})

useSeoMeta({
  title: 'Things I use',
  description: t('description'),
})

const { data: items } = await useAsyncData('uses', async () => await queryCollection('uses').all())
const { data: categories } = await useAsyncData('categories', async () => await queryCollection('categories').all())

const photos = [
  {
    src: '/uses/jetbrains.webp',
    caption: 'caption.jetbrains',
  },
  {
    src: '/uses/pycharm.webp',
    caption: 'caption.pycharm',
  },
  {
    src: '/uses/vscode.webp',
    caption: 'caption.vscode',
  },
]
</script>

<template>
  <main>
    <AppTitle
      :description="t('description')"
      :title="t('title')"
    />
    <div v-if="items" class="mt-12 space-y-12">
      <UsesList v-for="category in categories" :key="category.id" :title="category.name">
        <UsesItem
          v-for="(item, id) in items.filter(item => item.category === String(category.meta.title).toLowerCase())"
          :key="id"
          :item="item"
        />
        <div v-if="category.carousel && category.carousel === 'ides'" class="relative">
          <UCarousel
            v-slot="{ item }"
            arrows
            loop
            class="rounded-lg"
            :autoplay="{ delay: 4000 }"
            :items="photos"
            :prev="{ variant: 'ghost' }"
            :next="{ variant: 'ghost' }"
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
      </UsesList>
    </div>
  </main>
</template>

<i18n lang="json">
{
  "en": {
    "title": "My uses",
    "description": "Software I use, gadgets I love, and other things I recommend. Here’s a big list of all of my favorite stuff.",
    "caption": {
      "jetbrains": "My IntelliJ IDE",
      "vscode": "My Visual Studio Code IDE",
      "pycharm": "My PyCharm IDE"
    }
  },
  "fr": {
    "title": "Mes usages",
    "description": "Logiciels que j'utilise, gadgets que j'adore et autres choses que je recommande. Voici une grande liste de toutes mes choses préférées.",
    "caption": {
      "jetbrains": "Mon IDE IntelliJ Idea Ultimate",
      "vscode": "Mon IDE Visual Studio Code",
      "pycharm": "Mon IDE PyCharm"
    }
  },
  "es": {
    "title": "Mis aplicaciones.",
    "description": "Los programas que utilizo, los gadgets que adoro y otras cosas que recomiendo. Aquí te hago una lista de todas mis cosas preferidas. ",
    "caption": {
      "jetbrains": "Mi IDE IntelliJ Idea Ultimate",
      "vscode": "Mi IDE Visual Studio Code",
      "pycharm": "Mi IDE PyCharm"
    }
  }
}
</i18n>
