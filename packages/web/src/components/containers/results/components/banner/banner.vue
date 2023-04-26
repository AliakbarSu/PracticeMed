<template>
  <div
    class="flex items-center justify-center gap-x-6 px-6 py-2.5 sm:px-3.5"
    :class="{
      'bg-green-600': status,
      'bg-red-600': !status
    }"
  >
    <p class="text-center text-md leading-6 text-white">Pass</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const status = ref('pass')
</script>
