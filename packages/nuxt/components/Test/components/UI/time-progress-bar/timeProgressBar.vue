<!-- <template>
  <v-progress-linear
    class="rounded-sm"
    v-model="time"
    :color="barColor"
    height="35"
  ></v-progress-linear>
</template> -->
<template>
  <div>
    <h4 class="sr-only">Status</h4>
    <div aria-hidden="true" class="mt-6">
      <div class="overflow-hidden rounded-full bg-gray-200">
        <div
          :class="[barColor]"
          :style="{ width: `${value}%` }"
          class="h-2 rounded-full"
        />
      </div>
      <div
        class="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid"
      >
        <div class="text">End</div>
        <div class="text-center text-indigo-600"></div>
        <div class="text-center"></div>
        <div class="text-right text-indigo-600">Start</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { value } = defineProps<{ value: number }>();

const barColor = computed(() => {
  if (value > 50) {
    return "bg-green-600";
  } else if (value > 30) {
    return "bg-amber-600";
  } else {
    return "bg-red-600";
  }
});
</script>
