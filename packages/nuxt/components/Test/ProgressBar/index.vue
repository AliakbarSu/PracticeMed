<template>
  <div class="flex justify-between mb-1">
    <span class="text-base font-medium text-blue-700 dark:text-white"
      >Time left</span
    >
    <span class="text-sm font-medium text-blue-700 dark:text-white">{{
      value
    }}</span>
  </div>
  <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    <div
      :style="{ width: percent + '%' }"
      class="bg-blue-600 h-2.5 rounded-full"
    ></div>
  </div>
</template>
<script lang="ts" setup>
const { value, percent } = defineProps<{
  percent: number;
  value: string;
}>();
</script>
