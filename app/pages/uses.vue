<script setup lang="ts">
const description = 'Software I use, gadgets I love, and other things I recommend. Here’s a big list of all of my favorite stuff.'
useSeoMeta({
  title: 'Things I use | Arthur Danjou',
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
      <ul class="space-y-8">
        <UDivider
          label="Hardware"
          size="xs"
        />
        <UsesItem
          v-for="(item, id) in hardware"
          :key="id"
          :item="item"
        />
      </ul>
      <ul class="space-y-8">
        <UDivider
          label="Software"
          size="xs"
        />
        <UsesItem
          v-for="(item, id) in software"
          :key="id"
          :item="item"
        />
      </ul>
      <ul class="space-y-8">
        <UDivider
          label="IDE & Font"
          size="xs"
        />
        <li class="w-2/3 mx-auto">
          <NuxtImg
            alt="My IntelliJ IDE"
            src="/uses/jetbrains.png"
          />
          <p class="text-center text-sm mt-2 italic">
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
