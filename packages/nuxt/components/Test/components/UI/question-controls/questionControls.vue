<template>
  <div class="flex justify-end">
    <span class="mt-5 isolate inline-flex rounded-md shadow-sm">
      <button
        :class="{
          'opacity-50': submitting || disabled,
          'cursor-not-allowed': submitting || disabled,
          'rounded-r-md': !canSkip,
        }"
        :disabled="submitting || disabled"
        class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        type="button"
        @click="next"
      >
        {{ submitting ? "Submitting..." : "Next" }}
      </button>

      <button
        v-if="canSkip"
        :class="{
          'rounded-r-md': !canEnd,
          'opacity-50': submitting || disabled,
          'cursor-not-allowed': submitting || disabled,
        }"
        :disabled="submitting || disabled"
        class="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        type="button"
        @click="skip"
      >
        Skip
      </button>
      <button
        v-if="canEnd"
        :class="{
          'opacity-50': disabled,
          'cursor-not-allowed': disabled,
        }"
        :disabled="disabled"
        class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        type="button"
        @click="end"
      >
        End
      </button>
    </span>
  </div>
</template>

<script lang="ts" setup>
const { canSkip, canEnd, submitting, disabled } = defineProps({
  canSkip: {
    default: false,
    type: Boolean,
  },
  canEnd: {
    default: false,
    type: Boolean,
  },
  submitting: Boolean,
  disabled: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(["next", "skip", "end"]);

const next = () => {
  emit("next");
};
const skip = () => {
  emit("skip");
};
const end = () => {
  emit("end");
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: flex-end;
}
</style>
