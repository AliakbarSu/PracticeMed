<template>
  <Dashboard />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth' as any]
})
</script>
