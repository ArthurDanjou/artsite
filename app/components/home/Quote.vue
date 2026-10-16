<template>
  <section
    aria-labelledby="contact-invitation-title"
    class="not-prose rounded-2xl border border-neutral-200 dark:border-default bg-default dark:bg-elevated/30 p-6 sm:p-8"
  >
    <div class="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-default text-muted ring-1 ring-default">
        <UIcon
          name="i-ph-chat-circle-dots-duotone"
          class="size-6"
        />
      </div>

      <div class="min-w-0 flex-1 space-y-2">
        <h3
          id="contact-invitation-title"
          class="text-lg font-semibold text-highlighted"
        >
          My inbox is always open
        </h3>
        <p class="max-w-2xl text-sm leading-relaxed text-toned">
          Want to argue about robust aggregation rules, report a Krum bug, trade homelab tips, or just say hi? Write me, I read everything.
        </p>
      </div>

      <UButton
        to="mailto:contact@arthurdanjou.fr"
        icon="i-ph-envelope-simple-duotone"
        label="Write me"
        size="lg"
        color="neutral"
        variant="soft"
        class="min-h-11 justify-center rounded-md px-5 shrink-0 self-start sm:self-center"
        target="_blank"
      />
    </div>
  </section>
</template>
