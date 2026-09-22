<template>
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

    <div class="space-y-2">
      <h3 class="font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
        My inbox is always open
        <UIcon
          name="i-ph-chat-circle-dots-duotone"
          class="text-primary-500 w-5 h-5"
        />
      </h3>
      <p class="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
        Want to argue about robust aggregation rules, report a Krum bug, trade homelab tips, or just say hi? Write me, I read everything.
      </p>
      <UButton
        to="mailto:contact@arthurdanjou.fr"
        icon="i-ph-envelope-simple-duotone"
        label="Write me"
        size="xs"
        variant="soft"
        target="_blank"
      />
    </div>
  </div>
</template>
