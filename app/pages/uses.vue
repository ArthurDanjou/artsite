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
</script>

<template>
  <main>
    <AppTitle
      :description="t('description')"
      :title="t('title')"
    />
    <div class="mt-12 space-y-24">
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
        <UDivider
          :label="t('ide')"
          size="xs"
        />
        <li class="relative">
          <NuxtImg
            alt="My IntelliJ IDE"
            src="/uses/jetbrains.png"
            class="mx-auto md:w-4/5"
          />
          <p class="mt-2 text-sm italic flex gap-2 justify-center items-center">
            {{ t('intellij') }}
          </p>
        </li>
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
    "intellij": "My IntelliJ Idea Ultimate IDE"
  },
  "fr": {
    "title": "Mes usages",
    "description": "Logiciels que j'utilise, gadgets que j'adore et autres choses que je recommande. Voici une grande liste de toutes mes choses préférées.",
    "hardware": "Matériel",
    "software": "Logiciel",
    "ide": "IDE & Police",
    "stack": "Stack",
    "intellij": "Mon IDE IntelliJ Idea Ultimate"
  },
  "es": {
    "title": "Mis aplicaciones.",
    "description": "Los programas que utilizo, los gadgets que adoro y otras cosas que recomiendo. Aquí te hago una lista de todas mis cosas preferidas. ",
    "hardware": "Material",
    "software": "Programas",
    "ide": "IDE y Fuente",
    "stack": "Stack",
    "intellij": "Mi IDE IntelliJ Idea Ultimate"
  }
}
</i18n>
