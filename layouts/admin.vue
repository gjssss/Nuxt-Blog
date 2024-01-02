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
  <div class="ma box-border px-2 py-1 <sm:w-100% lg:w-800px sm:w80%">
    <slot />
  </div>
</template>
