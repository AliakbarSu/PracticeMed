<template>
  <LandingAMCMCQ />
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'AMC MCQ mock tests | Practice Med',
  description: 'Prepare for your AMC MCQ'
})
definePageMeta({
  middleware: ['fetch-plans']
})
</script>
