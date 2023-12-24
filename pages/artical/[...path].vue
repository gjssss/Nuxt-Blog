<script setup lang="ts">
const route = useRoute()
const paths = (route.params as unknown as any).path as string[]
const { data: content } = await useFetch(`/api/artical/${paths.join('/')}`)
const { data: meta } = await useFetch<Record<string, any>>(`/api/artical/${paths.join('/')}`, { method: 'post' })
useHead({
  title: meta.value?.title ?? 'test',
})
</script>

<template>
  <article class="article">
    <div v-if="content" v-html="content" />
    <div v-else>
      404 Not Find Artical
    </div>
  </article>
</template>

<style></style>
