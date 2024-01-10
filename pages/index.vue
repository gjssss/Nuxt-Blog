<script setup lang="ts">
interface info {
  path: string
  name: string
  excerpt?: string
  createAt: number
  updateAt: number
}
const { data } = await useFetch<info[]>('/api/catalogue')
</script>

<template>
  <div>
    <AritcleCard
      v-for="item in data"
      :key="item.path"
      :title="item.name"
      :link="`/article/${item.path}`"
      :update-at="(new Date(item.updateAt)).toLocaleDateString()"
      :create-at="(new Date(item.createAt)).toLocaleDateString()"
      :excerpt="item.excerpt"
    />
  </div>
</template>
