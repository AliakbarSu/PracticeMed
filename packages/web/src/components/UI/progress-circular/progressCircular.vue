<template>
  <div class="text-center">
    <v-progress-circular
      :size="100"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
