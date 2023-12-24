<script setup lang="ts">
const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <nav class="split-nav border">
    <div class="nav-brand">
      <h3><a href="/">Nuxt Blog</a></h3>
    </div>
    <div class="flex">
      <div class="collapsible">
        <input id="collapsible1" type="checkbox" name="collapsible1">
        <label for="collapsible1" class="!border-none !bg-transparent !p-0.1rem">
          <div class="bar1" />
          <div class="bar2" />
          <div class="bar3" />
        </label>
        <div class="collapsible-body !bg-transparent">
          <ul class="inline">
            <li><a href="https://github.com/" target="_blank">Github</a></li>
            <li>
              <a class="cursor-pointer" @click="toggleDark()">
                Theme
                <div class="i-carbon-sun dark:i-carbon-moon m0 inline-block p0 align-middle !h-1em !w-1em" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style></style>
