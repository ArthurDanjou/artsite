<template>
  <UCard>
    <div class="flex items-start sm:items-center gap-4">
      <ClientOnly>
        <UTooltip
          text="Arthur Danjou • Research & Engineering"
          :popper="{ placement: 'top' }"
        >
          <UAvatar
            src="/arthur.webp"
            alt="Arthur Danjou"
            size="xl"
            class="ring-2 ring-primary-500/20 dark:ring-primary-400/20 transition-transform duration-700 ease-in-out hover:rotate-360 shadow-sm"
          />
        </UTooltip>
      </ClientOnly>

      <div class="space-y-1">
        <h3 class="font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
          Let's start a discussion
          <UIcon
            name="i-ph-chat-circle-dots-duotone"
            class="text-primary-500 w-5 h-5"
          />
        </h3>
        <p class="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Thanks for stopping by my digital garden! Whether you have a question about a theorem, a suggestion for a project, or just want to say hi, I'd love to hear from you.
        </p>
      </div>
    </div>
  </UCard>
</template>
