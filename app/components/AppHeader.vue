<script setup lang="ts">
const colorMode = useColorMode()
const isDark = ref(colorMode.value === 'dark')
watch(isDark, () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
})

const navs = [
  {
    label: 'home',
    to: '/',
    icon: 'i-ph-house-line-duotone'
  },
  {
    label: 'uses',
    to: '/uses',
    icon: 'i-ph-briefcase-duotone'
  },
  {
    label: 'writings',
    to: '/writings',
    icon: 'i-ph-newspaper-clipping-duotone'
  },
  {
    label: 'resume',
    to: 'https://cvws.icloud-content.com/B/AX71VtCX0vhZs6_jUHDuotOGnb0VAQE4MV8KB7QIeY5Q5Gik5J1erx4y/CV+English.pdf?o=AkIvC5IrO-5fS21fwPXq7UGd0lswyMuXT-P7E5CowQQ0&v=1&x=3&a=CAogqklcIUioRMDFGNGnrRfaDkS9YEmojlUNZ6rG0QyMiuwSbxDU2oOLhDIY1LffjIQyIgEAUgSGnb0VWgRerx4yaieUQJCUnGaHq9iuUS1_UtlGN8Ioa3fXnJFInkj9n6PaXX4XnUO2y_ByJ8VXz1TffVsstlH_R9jT0WX2nkZVem0ZdiIZue6zB1iI0RG7vslM9A&e=1719087389&fl=&r=76b32fd5-6d83-4903-83a5-2ab70677813b-1&k=_NuEhyMkXeSuqqVw_4seIg&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=160&s=j5LuqIi_tMAZoyRrQVfV3PNfcjI&cd=i',
    target: '_blank',
    icon: 'i-ph-address-book-duotone'
  }
]
</script>

<template>
  <header class="flex items-center justify-between my-8">
    <NuxtLink
      class="handwriting text-lg sm:text-3xl flex gap-2 font-bold duration-300 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
      to="/"
    >
      Arthur Danjou
    </NuxtLink>
    <nav class="flex gap-2 items-center">
      <UTooltip
        v-for="nav in navs"
        :key="nav.label"
        :text="nav.label"
      >
        <UButton
          :icon="nav.icon"
          :target="nav.target ? nav.target : '_self'"
          :to="nav.to"
          color="gray"
          dynamic
          size="sm"
          variant="link"
        />
      </UTooltip>
      <ClientOnly>
        <UTooltip text="switch theme">
          <UButton
            :icon="isDark ? 'i-ph-moon-duotone' : 'i-ph-sun-duotone'"
            variant="link"
            color="gray"
            size="sm"
            @click="isDark = !isDark"
          />
        </UTooltip>
      </ClientOnly>
    </nav>
  </header>
</template>

<style>
.handwriting {
  font-family: 'Dancing Script', cursive;
}
</style>
