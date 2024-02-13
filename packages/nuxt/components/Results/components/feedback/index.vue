<template>
  <div class="overflow-hidden bg-white py-8">
    <div class="mx-auto px-6 lg:px-8">
      <div class="mx-auto lg:mx-0">
        <div class="x-auto lg:pl-4 lg:pt-4">
          <div class="mx-auto">
            <h2 class="text-base font-semibold leading-7 text-indigo-600">
              Personalized Feedback
            </h2>
            <!-- <p
              class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Personalized Tips
            </p> -->
            <p class="mt-6 text-lg leading-8 text-gray-600">
              By addressing these areas, you can enhance your overall test
              performance and achieve better results in future assessments.
              Remember to practice consistently, seek feedback, and maintain a
              balanced approach to your test preparation.
            </p>
            <dl
              class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none"
            >
              <div
                v-for="feedback in feedbacks"
                :key="feedback.aspect"
                class="relative pl-9"
              >
                <dt class="inline font-semibold text-gray-900">
                  {{ feedback.aspect }}
                </dt>
                {{ " " }}
                <dd class="inline">{{ feedback.recommendation }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Feedback } from "@types/results";

const { feedbacks } = withDefaults(defineProps<{ feedbacks: Feedback[] }>(), {
  feedbacks: [] as any,
});
</script>
