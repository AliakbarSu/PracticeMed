<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <Admin />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth-client"] });
</script>
