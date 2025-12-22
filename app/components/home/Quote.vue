<template>
  <div class="mt-4">
    <div class="float-left flex items-center mr-2 mt-1">
      <ClientOnly>
        <UTooltip text="It's me 👋">
          <UAvatar
            alt="Avatar"
            class="hover:rotate-360 duration-500 transform-gpu rounded-full"
            size="xl"
            src="/arthur.webp"
          />
        </UTooltip>
      </ClientOnly>
    </div>
    <p class="not-prose">
      Hello everyone! Thanks for visiting my portfolio. Please leave whatever you like to say, such as suggestions, appreciations, questions or anything!
    </p>
  </div>
</template>
