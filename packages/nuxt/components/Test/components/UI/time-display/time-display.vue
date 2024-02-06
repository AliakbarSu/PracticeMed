<template>
  <div class="bg-gray-900 rounded-md">
    <div class="mx-auto max-w-7xl">
      <div
        class="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-3 lg:grid-cols-3"
      >
        <div class="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8 rounded-l-md">
          <p class="mt-2 flex items-baseline gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-white">{{
              time.hours
            }}</span>
            <span class="text-sm text-gray-400">{{
              plural(time.hours, "Hour")
            }}</span>
          </p>
        </div>
        <div class="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
          <p class="mt-2 flex items-baseline gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-white">{{
              time.minutes
            }}</span>
            <span class="text-sm text-gray-400">{{
              plural(time.minutes, "Minute")
            }}</span>
          </p>
        </div>
        <div class="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8 rounded-r-md">
          <p class="mt-2 flex items-baseline gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-white">{{
              time.seconds
            }}</span>
            <span class="text-sm text-gray-400">{{
              plural(time.seconds, "Second")
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { time } = defineProps<{
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}>();

const plural = (time: number, word: string) => {
  return time > 1 ? word + "s" : word;
};
</script>
