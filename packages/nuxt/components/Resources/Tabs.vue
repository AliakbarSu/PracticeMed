<template>
  <div
    class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
  >
    <ul class="flex flex-wrap -mb-px">
      <li class="me-2" v-for="tab in tabs">
        <a
          href="#"
          @click="switchTab(tab.name)"
          class="inline-block p-4 border-b-2 border-transparent rounded-t-lg"
          :class="{
            'active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500':
              tab.current,
            'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
              !tab.current
          }"
          >{{ tab.name }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { tabs } = defineProps<{
  tabs: {
    name: string
    current: boolean
  }[]
}>()

const emit = defineEmits<{
  switchTab: (tab: string) => void
}>()

const switchTab = (tab: string) => {
  emit('switchTab', tab)
}
</script>
