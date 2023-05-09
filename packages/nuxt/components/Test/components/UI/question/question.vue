<template>
  <div class="bg-white px-6 py-16 lg:px-8">
    <div class="mx-auto text-base leading-7 text-gray-700">
      <p class="text-base font-semibold leading-7 text-indigo-600">
        Question Number: {{ question?.number }}
        <span
          class="ml-1 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
          v-if="question?.skipped"
          >Skipped</span
        >
        <span
          class="ml-1 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
          v-if="question?.isLast"
          >Last Question</span
        >
      </p>

      <p
        v-html="question?.text"
        class="mt-6 text-sm sm:text-xl leading-5 sm:leading-8"
      ></p>
    </div>
  </div>
</template>

<script lang="ts">
import type { QuestionInProgress } from '@/store/test'
import type { PropType } from 'vue'

export default {
  props: {
    question: {
      type: Object as PropType<QuestionInProgress>
    }
  },
  data() {
    return {
      imageOpen: false,
      selectedImage: ''
    }
  },
  methods: {
    showImage(image: string) {
      this.imageOpen = true
      this.selectedImage = image
    },
    hideImage() {
      this.imageOpen = false
    }
  }
}
</script>

<style scoped>
.hover-image {
  background-color: rgba(#fff, 0.8);
  cursor: pointer;
}
</style>
