<template>
  <div v-if="loading" class="fixed left-0 top-0 h-2 w-full z-50 bg-green-500" />
  <Teleport to="body">
    <div
      v-if="loading"
      class="bg-gray-200/85 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-40"
    >
      <div
        class="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"
      ></div>
    </div>
  </Teleport>
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
