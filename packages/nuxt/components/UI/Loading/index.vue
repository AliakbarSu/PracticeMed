<template>
  <div v-if="loading" class="fixed left-0 top-0 h-2 w-full z-50 bg-green-500" />
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const loading = ref(false)
nuxtApp.hook('page:start', () => {
  loading.value = true
})
nuxtApp.hook('page:finish', () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>
