<script setup lang="ts">
const description = 'Software I use, gadgets I love, and other things I recommend. Here’s a big list of all of my favorite stuff.'
useSeoMeta({
  title: 'Things I use',
  description
})

const { data: items } = await useAsyncData('uses', () =>
  queryContent('/uses').find()
)
const hardware = items.value!.filter(item => item.category === 'hardware')
const software = items.value!.filter(item => item.category === 'software')
const ide = items.value!.filter(item => item.category === 'ide')
</script>

<template>
  <main>
    <AppTitle
      :description="description"
      title="Uses"
    />
    <div class="mt-12 space-y-24">
      <UsesList title="Hardware">
        <UsesItem
          v-for="(item, id) in hardware"
          :key="id"
          :item="item"
        />
      </UsesList>
      <UsesList title="Software">
        <UsesItem
          v-for="(item, id) in software"
          :key="id"
          :item="item"
        />
      </UsesList>
      <ul class="space-y-8">
        <UDivider
          label="IDE & Font"
          size="xs"
        />
        <li class="relative">
          <NuxtImg
            alt="My IntelliJ IDE"
            src="/uses/jetbrains.png"
            class="mx-auto md:w-4/5"
          />
          <p class="mt-2 text-sm italic flex gap-2 justify-center items-center">
            My IntelliJ Idea Ultimate IDE
          </p>
        </li>
        <UsesItem
          v-for="(item, id) in ide"
          :key="id"
          :item="item"
        />
      </ul>
    </div>
  </main>
</template>
