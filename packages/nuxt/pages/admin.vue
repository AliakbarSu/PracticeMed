<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <h1>Admin panel not implemented yet</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '../src/store/main'
const appStore = useAppStore()
if (!appStore.isAdmin) {
  navigateTo('/')
}
</script>
