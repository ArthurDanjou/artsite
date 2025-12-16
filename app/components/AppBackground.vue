<template>
  <div class="pointer-events-none fixed inset-0 z-40 size-full overflow-hidden">
    <div class="noise pointer-events-none absolute inset-[-200%] z-50 size-[400%] bg-[url('/noise.png')] opacity-4" />
  </div>
</template>

<style scoped>
.noise {
    animation: noise 2s steps(10) infinite;
}

@keyframes noise {
    0%, 20%, 40%, 60%, 80%, 100% {
        transform: translate(0, 0);
    }
    10% {
        transform: translate(-5%, -10%);
    }
    30% {
        transform: translate(5%, 10%);
    }
    50% {
        transform: translate(-15%, 5%);
    }
    70% {
        transform: translate(10%, -5%);
    }
    90% {
        transform: translate(5%, -10%);
    }
}
</style>
