<script setup lang="ts">
import type { FileStructer } from '~/server/utils/file'

function computeSize(size: number) {
  if (size < 1 << 10)
    return `${size}B`

  else if (size < 1 << 21)
    return `${(size / 1024).toFixed(2)}KB`

  else
    return `${(size / 1024 / 1024 / 2).toFixed(2)}MB`
}

const { data } = useFetch('/api/admin/list')

const simpleData = computed(() => (data.value ?? []).map(file => ({
  createAt: (new Date(file.stats.birthtimeMs)).toLocaleDateString(),
  updateAt: (new Date(file.stats.ctimeMs)).toLocaleDateString(),
  name: file.name,
  size: computeSize(file.stats.size),
})))

const visible = ref(false)
const formData = ref<FileStructer>()

function generateFormData(obj: FileStructer) {
  formData.value = simpleDeepClone(obj)
}

function PropsObjectToArray(obj: Record<string, any>) {
  const arr = []
  for (const key in obj) {
    arr.push({
      key,
      value: obj[key],
    })
  }
  return arr
}

function showSideBar(index: number) {
  generateFormData(data.value![index] as unknown as FileStructer)
  visible.value = true
}
</script>

<template>
  <div class="overflow-hidden <sm:rounded-0 sm:rounded-2">
    <PmSidebar v-model:visible="visible" header="Information" position="right" class="<sm:w-full lg:w-40rem sm:w-80%">
      <div class="h-full w-full flex flex-col of-hidden pt-5">
        <div class="no-scrollbar flex flex-1 flex-col gap-6 of-auto">
          <div class="flex items-center gap-2">
            <div class="w-40%">
              <span class="form-label shadow">name</span>
            </div>
            <div>
              <span class="underline decoration-dotted">{{ formData?.name }}</span>
            </div>
            <button
              v-tooltip.focus.top="'rule: prop.title > prop.name > filename'"
              class="i-carbon-information border-none text-4.4 hover:c-$primary-color"
            />
          </div>
          <div class="flex gap-2">
            <div class="w-40%">
              <span class="form-label shadow">filename</span>
            </div>
            <div>
              <span class="underline decoration-dotted">{{ formData!.fileName }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="w-40%">
              <span class="form-label shadow">size</span>
            </div>
            <div>
              <span class="underline decoration-dotted">{{ computeSize(formData?.stats.size!) }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="w-40%">
              <span class="form-label shadow">createAt</span>
            </div>
            <div>
              <span class="underline decoration-dotted">
                {{ (new Date(formData!.stats.birthtimeMs)).toLocaleDateString() }}
              </span>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="w-40%">
              <span class="form-label shadow">updateAt</span>
            </div>
            <div>
              <span class="underline decoration-dotted">
                {{ (new Date(formData!.stats.ctimeMs)).toLocaleDateString() }}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-40%">
              <span class="form-label shadow">path</span>
            </div>
            <div>
              <span class="underline decoration-dotted">{{ formData!.path }}</span>
            </div>
            <button
              v-tooltip.focus.top="'rule: prop.path > local relative path'"
              class="i-carbon-information border-none text-4.4 hover:c-$primary-color"
            />
          </div>
          <div class="flex flex-wrap gap-2">
            <div class="w-40%">
              <span class="form-label shadow">local path</span>
            </div>
            <div>
              <span class="underline decoration-dotted">{{ formData!.absolutePath }}</span>
            </div>
          </div>
          <PmAccordion>
            <PmAccordionTab header="Props">
              <PmDataTable :value="PropsObjectToArray(formData!.data)">
                <PmColumn field="key" header="key" />
                <PmColumn field="value" header="value" />
              </PmDataTable>
            </PmAccordionTab>
          </PmAccordion>
        </div>
        <div class="h-16 flex flex-row items-center">
          <PmButton>save</PmButton>
        </div>
      </div>
    </PmSidebar>

    <PmDataTable :value="simpleData">
      <PmColumn field="name" header="name" />
      <PmColumn field="updateAt" header="updateAt" />
      <PmColumn field="createAt" header="createAt" />
      <PmColumn field="size" header="size" />
      <PmColumn header="opration">
        <template #body="{ index }">
          <div class="i-carbon-view cursor-pointer" @click="showSideBar(index)" />
        </template>
      </PmColumn>
    </PmDataTable>
  </div>
</template>

<style>
.form-label {
  display: inline;
  padding: 0.2rem 0.5rem;
  margin-bottom: 0.2rem;
  border-radius: 0.2rem;

  background-color: var(--primary-color);
  color: var(--surface-50);
  font-weight: 700;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
