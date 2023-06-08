<template>
  <Plans />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['fetch-plans']
})
useSeoMeta({
  title:
    'AMC MCQ mock tests, USMLE Step 1 mock tests, Plab 1 mock tests, MCAT mock tests | Practice Med',
  description:
    'Practice Med provides mock tests for the popular medical licensing exams such as AMC MCQ, USMLE Step 1, MCAT, and Plab 1.'
})
</script>
