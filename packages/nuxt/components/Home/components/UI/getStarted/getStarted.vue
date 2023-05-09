<template>
  <section
    aria-labelledby="perks-heading"
    class="border-t border-gray-200 bg-gray-50"
  >
    <h2 id="perks-heading" class="sr-only">Our perks</h2>

    <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div
        class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0"
      >
        <div
          v-for="perk in perks"
          :key="perk.name"
          class="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
        >
          <div class="md:flex-shrink-0">
            <!-- <div class="flow-root"> -->
            <!-- <dt class="text-base font-semibold leading-7 text-gray-900">
              <div
                class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"
              >
                <component :is="perk.icon" class="h-6 w-6 text-white" />
              </div>
            </dt> -->
            <!-- <img
                class="-my-1 mx-auto h-24 w-auto"
                :src="perk.imageUrl"
                alt=""
              /> -->
            <!-- </div> -->
          </div>
          <div class="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
            <h3 class="text-base font-medium text-gray-900">{{ perk.name }}</h3>
            <p class="mt-3 text-sm text-gray-500">{{ perk.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {
  CurrencyDollarIcon,
  ChartPieIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon
} from '@heroicons/vue/20/solid'
const perks = [
  {
    name: 'Choose Your Test',
    icon: ClipboardDocumentListIcon,
    description:
      "Select the mock medical exam that matches your needs, whether it's for the MCAT, USMLE, or another exam."
  },
  {
    name: 'Take the Test',
    icon: ClipboardDocumentListIcon,
    description:
      'Experience a realistic testing environment as you take the mock exam, which simulates the actual exam experience including timing, format, and difficulty level.'
  },
  {
    name: 'Receive Feedback',
    icon: ClipboardDocumentListIcon,
    description:
      ' Get detailed feedback and analysis of your performance, including strengths and weaknesses. Use this information to develop a targeted study plan that addresses areas of improvement.'
  },
  {
    name: 'Improve Your Scores',
    icon: ClipboardDocumentListIcon,
    description:
      " With the comprehensive coverage and expert feedback provided by our service, you'll be fully prepared to boost your scores and achieve success on your medical exams!"
  }
]
</script>
