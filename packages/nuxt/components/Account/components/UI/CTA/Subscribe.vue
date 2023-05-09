<template>
  <div class="bg-white">
    <div class="px-6 py-6 sm:px-6 sm:py-16 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {{ heading }}
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-md leading-8 text-gray-600">
          {{ description }}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            @click="navigateToPlans"
            href="#"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Get started</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    heading: {
      type: String,
      default:
        'Boost Your Scores with Our Mock Medical Exams - Revolutionize Your Test Prep!'
    },
    description: {
      type: String,
      default:
        'Experience Realistic Testing Conditions, Expert Feedback, and Comprehensive Coverage to Ace Your Medical Exams with Confidence and Ease.'
    }
  },
  methods: {
    navigateToPlans() {
      this.$router.push('/plans')
    }
  }
})
</script>
