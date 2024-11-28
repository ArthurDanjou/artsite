<script lang="ts" setup>
const { t } = useI18n({
  useScope: 'local',
})
</script>

<template>
  <div class="flex items-center gap-2 mt-4">
    <div class="flex items-center">
      <UTooltip text="It's me 👋">
        <div class="flex items-center w-12 h-12">
          <UAvatar
            alt="Avatar"
            class="hover:rotate-[360deg] duration-500 transform-gpu"
            size="md"
            src="/favicon.png"
          />
        </div>
      </UTooltip>
    </div>
    <p class="not-prose">
      {{ t('quote') }}
    </p>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "quote": "Hello everyone! Thanks for visiting my portfolio. Please leave whatever you like to say, such as suggestions, appreciations, questions or anything!"
  },
  "fr": {
    "quote": "Bonjour tout le monde ! Merci de visiter mon portfolio. N'hésitez pas à laisser ce que vous avez à dire, comme des suggestions, des appréciations, des questions ou autre chose !"
  },
  "es": {
    "quote": "Hola a todos ! Muchas gracias por visitar mi portfolio. No dudes en dejar cualquier comentario, como sugerencias, apreciaciones. preguntas, o cualquier cosa !"
  }
}
</i18n>
