<template></template>
<script lang="ts" setup>
const props = defineProps<{
  testId: string | null
}>()

watch(
  () => props.testId,
  async (testId) => {
    if (testId) {
      await navigateTo(`/results/${testId}`)
    }
  }
)
</script>
