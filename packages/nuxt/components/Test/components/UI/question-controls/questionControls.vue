<template>
  <div class="flex justify-end">
    <span class="mt-5 isolate inline-flex rounded-md shadow-sm">
      <button
        @click="next"
        type="button"
        class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Next
      </button>
      <button
        v-if="canSkip"
        @click="skip"
        type="button"
        class="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Skip
      </button>
      <button
        @click="end"
        type="button"
        class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        End
      </button>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  props: ['canSkip'],
  methods: {
    next() {
      this.$emit('next')
    },
    skip() {
      this.$emit('skip')
    },
    end() {
      this.$emit('end')
    }
  }
}
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: flex-end;
}
</style>
