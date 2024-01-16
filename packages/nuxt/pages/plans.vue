<template>
  <Plans />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['fetch-plans']
})
useSeoMeta({
  title: 'AMC MCQ mock tests | Practice Med',
  description:
    'Practice Med provides mock tests for the popular medical licensing exams such as AMC MCQ'
})
</script>
