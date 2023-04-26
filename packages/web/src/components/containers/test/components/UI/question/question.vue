<!-- <template>
  <div class="elevation-2 rounded-lg pa-2">
    <p class="text-caption">Question Number: {{ question?.number }}</p>
    <p v-html="question?.title" class="font-weight-regular"></p>
    <v-container class="d-flex flex-wrap justify-space-between">
      <v-hover
        v-for="image in question?.media"
        :key="image.url"
        v-slot="{ isHovering }"
      >
        <v-img
          :class="{
            'mx-1': true,
            'hover-image': isHovering,
            'mt-2': true,
            'elevation-16': isHovering,
            'elevation-2': !isHovering
          }"
          :aspect-ratio="16 / 8"
          @click="showImage(image.url)"
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="400"
          max-width="400"
          :src="image.url"
        ></v-img>
      </v-hover>
    </v-container>
    <v-overlay :value="imageOpen" :opacity="0.9">
      <v-img
        class="mt-2"
        lazy-src="https://picsum.photos/id/11/10/6"
        :src="selectedImage"
      ></v-img>
      <v-container class="white">
        <v-btn color="success" @click="hideImage"> Close Image </v-btn>
      </v-container>
    </v-overlay>
  </div>
</template> -->

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

      <p v-html="question?.text" class="mt-6 text-xl leading-8"></p>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { QuestionInProgress } from '../../../test.vue'

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
