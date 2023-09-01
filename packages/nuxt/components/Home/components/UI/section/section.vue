<template>
  <!-- Feature section -->
  <div class="bg-white mx-auto w-full px-6 pt-24 sm:pt-32 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="text-base font-semibold leading-7 text-indigo-600">
        Mock Your Success
      </h2>
      <p
        class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        Ace Your Medical Tests with Confidence
      </p>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        Prepare for success with our mock medical exams! Our service provides a
        realistic exam experience and meaningful feedback to help you identify
        your strengths and weaknesses.
      </p>
    </div>
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl
        class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
      >
        <div
          v-for="feature in features"
          :key="feature.name"
          class="relative pl-16"
        >
          <dt
            class="text-base font-semibold leading-7 text-gray-900"
            style="position: unset"
          >
            <div
              class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"
            >
              <component
                :is="feature.icon"
                class="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            {{ feature.name }}
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600">
            {{ feature.description }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  CurrencyDollarIcon,
  ChartPieIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon
} from '@heroicons/vue/20/solid'
const features = [
  {
    name: 'Comprehensive Test Coverage',
    description:
      'Our service offers a range of mock medical exams to help students prepare for their medical exams. Our tests cover all essential topics and subtopics, so students can gain a complete understanding of the material.',
    icon: ChartPieIcon
  },
  {
    name: 'Realistic Exam Experience',
    description:
      'All the tests are designed to simulate the actual medical exam experience, including timing, format, and difficulty level. This allows students to become comfortable with the testing environment and be better prepared on exam day.',
    icon: ClipboardDocumentIcon
  },
  {
    name: 'Feedback and Analysis',
    description:
      'Practice Med offers in-depth evaluations and insights on student performance in practice tests. By pinpointing their strong and weak points, learners can devise a tailored study strategy that focuses on enhancing their areas in need of growth.',
    icon: ClipboardDocumentListIcon
  },
  {
    name: 'Affordable and Convenient',
    description:
      'Practice Med is affordable and can be accessed online from anywhere, anytime. This makes it easy for students to fit test preparation into their busy schedules, and ensure they are fully prepared for their medical exams.',
    icon: CurrencyDollarIcon
  }
]
</script>
