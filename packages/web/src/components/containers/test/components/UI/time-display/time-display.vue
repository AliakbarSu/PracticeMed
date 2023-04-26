<template>
  <div class="bg-gray-900">
    <div class="mx-auto max-w-7xl">
      <div
        class="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-3 lg:grid-cols-3"
      >
        <div class="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
          <p class="mt-2 flex items-baseline gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-white">{{
              time.h
            }}</span>
            <span class="text-sm text-gray-400">{{
              plural(time.h, 'Hour')
            }}</span>
          </p>
        </div>
        <div class="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
          <p class="mt-2 flex items-baseline gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-white">{{
              time.m
            }}</span>
            <span class="text-sm text-gray-400">{{
              plural(time.m, 'Minute')
            }}</span>
          </p>
        </div>
        <div class="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
          <p class="mt-2 flex items-baseline gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-white">{{
              time.s
            }}</span>
            <span class="text-sm text-gray-400">{{
              plural(time.s, 'Second')
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['time'],
  methods: {
    plural(time: number, word: string) {
      return time > 1 ? word + 's' : word
    }
  }
}
</script>

<style scoped>
.time-display-container {
  padding: 10px 0;
}
</style>
