<template>
  <svg class="inline" width="2.5em" height="2.5em" viewBox="0 0 24 24" focusable="false">
    <path
      d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"
      fill="currentColor"
    />
  </svg>
</template>

<script lang="ts">
export default {
  name: "ComputerIcon",
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>
