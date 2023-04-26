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
          v-for="(tier, tierIdx) in tiers"
          :key="tier.id"
          :class="[
            tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
            tierIdx === 0 ? 'lg:rounded-r-none' : '',
            tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
            'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10'
          ]"
        >
          <SkeletonLoading v-if="loading" />
          <div v-if="!loading">
            <div class="flex items-center justify-between gap-x-4">
              <h3
                :id="tier.id"
                :class="[
                  tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                  'text-lg font-semibold leading-8'
                ]"
              >
                {{ tier.name }}
              </h3>
              <p
                v-if="tier.mostPopular"
                class="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600"
              >
                Most popular
              </p>
            </div>
            <p class="mt-4 text-sm leading-6 text-gray-600">
              {{ tier.description }}
            </p>
            <p class="mt-6 flex items-baseline gap-x-1">
              <span class="text-4xl font-bold tracking-tight text-gray-900">{{
                tier.price
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
                v-for="feature in tier.features"
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
          <a
            v-if="!loading"
            @click="
              tier.freeTrial
                ? subscribeToFreeTrial(tier.id)
                : subscribeToPlan(tier.id)
            "
            :aria-describedby="tier.id"
            :class="[
              tier.mostPopular
                ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
              'mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            ]"
            >{{
              tier.freeTrial
                ? `Start ${tier.freeTrial} days free trial`
                : 'Get plan'
            }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Plan } from '@/types/plans'
import { CheckIcon } from '@heroicons/vue/20/solid'
import { defineComponent } from 'vue'
import axios from 'axios'
import SkeletonLoading from './components/loading/CardLoading.vue'

export default defineComponent({
  components: {
    CheckIcon,
    SkeletonLoading
  },
  data() {
    return {
      loading: false,
      tiers: [{}, {}, {}] as Plan[]
    }
  },
  async created() {
    const getPlans = async () => {
      this.loading = true
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/plans`
        )
        this.tiers = JSON.parse(result.data.body)
      } catch (err) {
      } finally {
        this.loading = false
      }
    }
    getPlans()
  },
  methods: {
    async subscribeToPlan(planId: string) {
      const checkoutUrl = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/plans/${planId}/subscribe`
      )
      window.location.replace(checkoutUrl.data.body)
    },
    async subscribeToFreeTrial(planId: string) {
      const checkoutUrl = await axios.get(
        `${
          import.meta.env.VITE_API_ENDPOINT
        }/plans/${planId}/subscribe/free-trial`
      )
      window.location.replace(checkoutUrl.data.body)
    }
  }
})
</script>
