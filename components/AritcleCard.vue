<script setup lang="ts">
const props = defineProps<{
  title: string
  updateAt?: string
  createAt?: string
  link: string
  excerpt?: string
  index?: number
}>()
const borderClass = computed(() => `border-${(props.index ?? 0) % 6}`)
</script>

<template>
  <div class="card mt4 border-1 b-$primary" :class="borderClass">
    <div class="card-body">
      <h1 class="card-title">
        {{ title }}
      </h1>
      <h5 class="card-subtitle text-right text-sm">
        <div v-if="createAt" class="mx2 inline">
          Create At: {{ createAt }}
        </div>
        <div v-if="updateAt" class="mx2 inline">
          Update At: {{ updateAt }}
        </div>
      </h5>
      <div class="card-text" v-html="excerpt" />
      <button class="btn-secondary float-right" @click="navigateTo(link)">
        Read More
      </button>
    </div>
  </div>
</template>

<style></style>
