<template>
  <Dashboard />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth-client", "fetch-plans"] as unknown as any,
});
</script>
