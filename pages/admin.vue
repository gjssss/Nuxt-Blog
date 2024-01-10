<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})
const items = ref([
  { label: 'File', icon: '/images/folder.png', link: '/admin/article' },
  { label: 'Post', icon: '/images/note.png', link: '/admin/post' },
  { label: 'Setting', icon: '/images/setting.png', link: '/admin/setting' },
])
</script>

<template>
  <PmDock :model="items" position="bottom">
    <template #icon="{ item }">
      <img :src="item.icon" style="width: 100%" @click="navigateTo(item.link)">
    </template>
  </PmDock>
  <main class="mt-10">
    <NuxtPage :transition="{ name: 'slide-fade', mode: 'out-in' }" />
  </main>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
