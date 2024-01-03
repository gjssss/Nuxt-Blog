<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: '/styles/admin.css',
    },
    {
      id: 'theme-lignt-lara',
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/primevue@3.45.0/resources/themes/lara-light-green/theme.css',
    },
    {
      id: 'theme-dark-lara',
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/primevue@3.45.0/resources/themes/lara-dark-green/theme.css',
    },
  ],
})
</script>

<template>
  <div class="ma box-border px-2 py-1 <sm:w-100% lg:w-800px sm:w80%">
    <slot />
  </div>
</template>
