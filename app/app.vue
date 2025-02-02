<script lang="ts" setup>
useHead({
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
})

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})
</script>

<template>
  <Html
    :dir="head.htmlAttrs.dir"
    :lang="head.htmlAttrs.lang"
  >
    <Head>
      <template
        v-for="link in head.link"
        :key="link.id"
      >
        <Link
          :id="link.id"
          :href="link.href"
          :hreflang="link.hreflang"
          :rel="link.rel"
        />
      </template>
      <template
        v-for="meta in head.meta"
        :key="meta.id"
      >
        <Meta
          :id="meta.id"
          :content="meta.content"
          :property="meta.property"
        />
      </template>
    </Head>
    <Body>
      <UApp>
        <NuxtLoadingIndicator color="#808080" />
        <AppBackground />
        <UContainer class="z-50 relative">
          <AppHeader />
          <NuxtPage class="mt-12" />
          <AppFooter />
        </UContainer>
      </UApp>
    </Body>
  </Html>
</template>

<style>
body {
  font-family: 'DM Sans', sans-serif;
}

.sofia {
  font-family: 'Sofia Sans', sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
