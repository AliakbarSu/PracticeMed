<template>
  <div class="overflow-hidden bg-white py-8">
    <div class="mx-auto px-6 lg:px-8">
      <div class="mx-auto lg:mx-0">
        <div class="x-auto lg:pl-4 lg:pt-4">
          <div class="mx-auto">
            <h2 class="text-base font-semibold leading-7 text-indigo-600">
              Personalized Tips
            </h2>
            <!-- <p
              class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Personalized Tips
            </p> -->
            <p class="mt-6 text-lg leading-8 text-gray-600">
              Your overall score is great, but there are some things you can
              improve on.
            </p>
            <dl
              class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none"
            >
              <div
                v-for="feature in features"
                :key="feature.name"
                class="relative pl-9"
              >
                <dt class="inline font-semibold text-gray-900">
                  {{ feature.name }}
                </dt>
                {{ ' ' }}
                <dd class="inline">{{ feature.description }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const features = [
  {
    name: 'Prioritize Easy Questions',
    description:
      'Start by quickly scanning through the test and answering the easier questions first. This ensures that you secure points for questions you know well, leaving more time for challenging ones later.'
  },
  {
    name: 'Time-Bound Practice.',
    description:
      "During practice sessions, set a timer for each question based on the average time you'll have in the real test. This trains your mind to work efficiently within those constraints."
  },
  {
    name: 'Maintain a Steady Pace',
    description:
      'Aim to maintain a consistent pace throughout the test. Avoid rushing through the initial questions and then slowing down significantly towards the end.'
  }
]
</script>
