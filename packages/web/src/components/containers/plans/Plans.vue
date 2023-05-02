<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base font-semibold leading-7 text-indigo-600">
          Pricing
        </h2>
        <p
          class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
        >
          Affordable Pricing Options for Medical Exam Mock Tests
        </p>
      </div>
      <p
        class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600"
      >
        Access Extensive Mock Tests at Competitive Prices. Boost Your Exam
        Preparation with High-Quality Test Materials
      </p>
      <div
        class="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <div
          v-for="(plan, tierIdx) in plans"
          :key="plan.id"
          :class="[
            plan.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
            tierIdx === 0 ? 'lg:rounded-r-none' : '',
            tierIdx === plans.length - 1 ? 'lg:rounded-l-none' : '',
            'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10'
          ]"
        >
          <SkeletonLoading v-if="loading" />
          <div v-if="!loading">
            <div class="flex items-center justify-between gap-x-4">
              <h3
                :id="plan.id"
                :class="[
                  plan.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                  'text-lg font-semibold leading-8'
                ]"
              >
                {{ plan.name }}
              </h3>
              <p
                v-if="plan.mostPopular"
                class="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600"
              >
                Most popular
              </p>
            </div>
            <p class="mt-4 text-sm leading-6 text-gray-600">
              {{ plan.description }}
            </p>
            <p class="mt-6 flex items-baseline gap-x-1">
              <span class="text-4xl font-bold tracking-tight text-gray-900">{{
                plan.price
              }}</span>
              <span class="text-sm font-semibold leading-6 text-gray-600">
                USD /month</span
              >
            </p>
            <ul
              role="list"
              class="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="flex gap-x-3"
              >
                <CheckIcon
                  class="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {{ feature }}
              </li>
            </ul>
          </div>
          <GetPlanButton :profile="profile" :plan="plan" :loading="loading" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CheckIcon } from '@heroicons/vue/20/solid'
import SkeletonLoading from './components/loading/CardLoading.vue'
import GetPlanButton from './components/Buttons/GetPlan.vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/main'

const store = useAppStore()

const { profile, plans, loading } = storeToRefs(store)
</script>
