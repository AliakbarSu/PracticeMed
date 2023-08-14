<template>
  <Dashboard />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['fetch-plans']
})
</script>
