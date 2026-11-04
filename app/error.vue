<script lang="ts" setup>
const route = useRoute()
const error = useError()
const errorData = error.value?.data as { path?: string } | undefined

const host = getCurrentHost()
const isMainHost = MAIN_HOSTNAMES.includes(host)
  || (import.meta.dev && (host === 'localhost' || host === '127.0.0.1'))

if (import.meta.client && error.value?.statusCode === 404 && isMainHost) {
  const search = new URLSearchParams({
    code: '404',
    path: errorData?.path || error.value.url || route.fullPath
  })
  const target = import.meta.dev
    ? `/errors?${search}`
    : `https://${ERRORS_HOSTNAME}/errors?${search}`
  window.location.replace(target)
}

useSeoMeta({
  title: '404 - Page Not Found',
  robots: 'noindex, nofollow'
})
</script>

<template>
  <UApp class="relative flex h-screen flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <h1 class="text-center font-serif text-[14rem] italic">
        404
      </h1>
      <p class="text-center flex gap-1">
        I think you're lost, let's go back
        <HomeLink
          label="home"
          href="/"
        />
      </p>
    </div>
  </UApp>
</template>
