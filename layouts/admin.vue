<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: '/styles/reset-tailwind.css',
    },
  ],
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style src="@unocss/reset/tailwind.css"></style>
