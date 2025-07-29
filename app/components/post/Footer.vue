<script lang="ts" setup>
const { t } = useI18n({
  useScope: 'local',
})
</script>

<template>
  <div class="p-8 border border-gray-200 dark:border-neutral-700 rounded-md">
    <NuxtImg
      src="/arthur.webp"
      alt="Arthur Danjou"
      class="w-24 h-24 rounded-full float-left mr-4 mb-4"
    />
    <i18n-t
      keypath="thanks"
      tag="p"
      class="text-neutral-600 dark:text-neutral-400 text-justify"
    >
      <template #linkedin>
        <HomeLink
          href="https://www.linkedin.com/in/arthurdanjou/"
          icon="i-ph-linkedin-logo-duotone"
          label="LinkedIn"
          target="_blank"
          class="inline-flex items-start gap-1 transform translate-y-1"
        />
      </template>
      <template #github>
        <HomeLink
          href="https://github.com/arthurdanjou"
          icon="i-ph-github-logo-duotone"
          label="GitHub"
          target="_blank"
          class="inline-flex items-start gap-1 transform translate-y-1"
        />
      </template>
      <template #comment>
        <strong class="text-neutral-800 dark:text-neutral-200">{{ t('comment') }}</strong>
      </template>
      <template #name>
        <strong class="text-neutral-800 dark:text-neutral-200">{{ t('name') }}</strong>
      </template>
      <template #jump>
        <br> <br>
      </template>
    </i18n-t>
  </div>
</template>

<i18n lang="json">
{
    "en": {
        "thanks": "Thanks for reading! My name is {name}, and I love writing about AI, data science, and the intersection between mathematics and programming. {jump} I've been coding and exploring math for years, and I'm always learning something new—whether it's self-hosting tools in my homelab, experimenting with machine learning models, or diving into statistical methods. {jump} I share my knowledge here because I know how valuable clear, hands-on resources can be, especially when you're just getting started or exploring something deeply technical. {jump} If you have any questions or just want to chat, feel free to reach out to me on {linkedin} or {github  }. {jump} I hope you enjoyed this post and learned something useful. If you did, {comment}—it really helps and means a lot!",
        "comment": "consider sharing it",
        "name": "Arthur"
    },
    "es": {
        "thanks": "¡Gracias por leer! Me llamo {name} y me encanta escribir sobre inteligencia artificial, ciencia de datos y todo lo que se encuentra en la intersección entre las matemáticas y la programación. {jump} Llevo años programando y explorando las matemáticas, y cada día aprendo algo nuevo — ya sea autoalojando herramientas en mi homelab, experimentando con modelos de aprendizaje automático o profundizando en métodos estadísticos. {jump} Comparto mis conocimientos aquí porque sé lo valiosos que pueden ser los recursos claros, prácticos y accesibles, especialmente cuando uno está empezando o explorando temas técnicos en profundidad. {jump} Si tienes alguna pregunta o simplemente quieres charlar, no dudes en dejar un comentario abajo o contactarme por {linkedin} o {github}. {jump} Espero que este artículo te haya gustado y que hayas aprendido algo útil. Si es así, {comment} — ¡me ayuda mucho y significa mucho para mí!",
        "comment": "considera compartirlo",
        "name": "Arthur"
    },
    "fr": {
        "thanks": "Merci de votre lecture ! Je m'appelle {name}, et j'adore écrire sur l'intelligence artificielle, la data science, et tout ce qui se situe à l'intersection entre les mathématiques et la programmation. {jump} Je code et j'explore les maths depuis des années, et j'apprends encore de nouvelles choses chaque jour — que ce soit en auto-hébergeant des outils dans mon homelab, en expérimentant des modèles de machine learning ou en approfondissant des méthodes statistiques. {jump} Je partage mes connaissances ici parce que je sais à quel point des ressources claires, pratiques et accessibles peuvent être précieuses, surtout quand on débute ou qu'on explore un sujet technique en profondeur. {jump} Si vous avez des questions ou simplement envie d'échanger, n'hésitez pas à laisser un commentaire ci-dessous ou à me contacter sur {linkedin} ou {github}. {jump} J'espère que cet article vous a plu et qu'il vous a appris quelque chose d'utile. Si c'est le cas, {comment} — ça m'aide beaucoup et ça me fait vraiment plaisir !",
        "comment": "pensez à le partager",
        "name": "Arthur"
    }
}
</i18n>
