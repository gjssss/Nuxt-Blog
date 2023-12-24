<script setup lang="ts">
defineProps<{
  title: string
  updateAt?: string
  createAt?: string
  link: string
}>()
const borderStyle = `border-${Math.floor(Math.random() * 6 + 1)}`
</script>

<template>
  <div class="card mt4 border-1 b-$primary" :class="borderStyle">
    <div class="card-body">
      <h1 class="card-title">
        {{ title }}
      </h1>
      <h5 class="card-subtitle text-right text-sm">
        <div v-if="createAt" class="mx2 inline-block">
          Create At: {{ createAt }}
        </div>
        <div v-if="updateAt" class="mx2 inline-block">
          Update At: {{ updateAt }}
        </div>
      </h5>
      <p class="card-text">
        <slot />
      </p>
      <button class="btn-secondary float-right" @click="navigateTo(link)">
        Read More
      </button>
    </div>
  </div>
</template>

<style></style>
