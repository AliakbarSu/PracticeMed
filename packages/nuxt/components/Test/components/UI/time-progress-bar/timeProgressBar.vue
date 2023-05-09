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
    <div class="mt-6" aria-hidden="true">
      <div class="overflow-hidden rounded-full bg-gray-200">
        <div
          class="h-2 rounded-full"
          :class="[barColor]"
          :style="{ width: `${time}%` }"
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

<script lang="ts">
export default {
  props: ['timeElapsed'],
  computed: {
    time() {
      return this.timeElapsed
    },
    barColor() {
      if (this.timeElapsed > 50) {
        return 'bg-green-600'
      } else if (this.timeElapsed > 30) {
        return 'bg-amber-600'
      } else {
        return 'bg-red-600'
      }
    }
  }
}
</script>
