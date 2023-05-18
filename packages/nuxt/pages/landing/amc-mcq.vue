<template>
  <LandingAMCMCQ />
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'AMC MCQ - MOCK TEST',
  description: 'Prepare for your AMC MCQ'
})
definePageMeta({
  middleware: ['fetch-plans']
})
</script>
