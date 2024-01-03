<script setup lang="ts">
function computeSize(size: number) {
  if (size < 1 << 10)
    return `${size}B`

  else if (size < 1 << 21)
    return `${(size / 1024).toFixed(2)}KB`

  else
    return `${(size / 1024 / 1024 / 2).toFixed(2)}MB`
}

const { data } = useFetch('/api/admin/list', {
  transform: (data) => {
    return data.map(file => ({
      createAt: (new Date(file.createAt)).toLocaleDateString(),
      updateAt: (new Date(file.updateAt)).toLocaleDateString(),
      name: file.name,
      size: computeSize(file.size),
    }))
  },
})

const visible = ref(false)
</script>

<template>
  <div class="overflow-hidden rounded-3">
    <PmSidebar v-model:visible="visible" header="Sidebar" position="right">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </PmSidebar>

    <PmDataTable :value="data">
      <PmColumn field="name" header="name" />
      <PmColumn field="updateAt" header="updateAt" />
      <PmColumn field="createAt" header="createAt" />
      <PmColumn field="size" header="size" />
      <PmColumn header="opration">
        <template #body>
          <div class="i-carbon-view cursor-pointer" @click="visible = true" />
        </template>
      </PmColumn>
    </PmDataTable>
  </div>
</template>

<style></style>
