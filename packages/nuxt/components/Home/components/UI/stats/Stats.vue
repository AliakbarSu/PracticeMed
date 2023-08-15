<template>
  <div class="bg-gray-900 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Designed to help IMG doctors achieve success
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-300">
            Here are some of the key stats that demonstrate the effectiveness of
            our platform
          </p>
        </div>
        <dl
          class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4"
        >
          <div
            v-for="stat in stats"
            :key="stat.id"
            class="flex flex-col bg-white/5 p-8"
          >
            <dt class="text-sm font-semibold leading-6 text-gray-300">
              {{ stat.name }}
            </dt>
            <dd
              class="order-first text-3xl font-semibold tracking-tight text-white"
            >
              {{ stat.value }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const stats = [
  {
    id: 1,
    name: 'Practice questions covering major medical subjects',
    value: '1,000+'
  },
  {
    id: 2,
    name: 'Improvement after using our platform (reported)',
    value: '25%'
  },
  {
    id: 3,
    name: 'Success rate among our subscribers in their respective medical exams',
    value: '87%'
  },
  { id: 4, name: 'More affordable than similar platforms', value: '30%' }
]
</script>
