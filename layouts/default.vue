<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: '/styles/paper.min.css',
    },
    {
      rel: 'stylesheet',
      href: '/styles/front.css',
    },
  ],
})
</script>

<template>
  <div class="ma box-border px-2 py-1 <sm:w-100% lg:w-800px sm:w80%">
    <AppNav />
    <main class="mt5">
      <slot />
    </main>
  </div>
</template>