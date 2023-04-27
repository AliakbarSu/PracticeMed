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
          <SkeletonLoading v-if="loading.plans" />
          <div v-if="!loading.plans">
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
            v-if="!loading.plans"
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
              'mt-8 block rounded-md py-2 px-3 text-center cursor-pointer text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            ]"
          >
            <div
              role="status"
              class="flex justify-center"
              v-if="isCheckoutLoading(tier.id)"
            >
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
            <span v-else>
              {{
                tier.freeTrial
                  ? `Start ${tier.freeTrial} days free trial`
                  : 'Get plan'
              }}</span
            >
          </a>
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
      loading: {
        plans: false,
        checkout: ''
      },
      tiers: [{}, {}, {}] as Plan[]
    }
  },
  async created() {
    const getPlans = async () => {
      this.loading.plans = true
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/plans`
        )
        this.tiers = JSON.parse(result.data.body)
      } catch (err) {
      } finally {
        this.loading.plans = false
      }
    }
    getPlans()
  },
  methods: {
    async subscribeToPlan(planId: string) {
      this.loading.checkout = planId
      try {
        const checkoutUrl = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/plans/${planId}/subscribe`
        )
        window.location.replace(checkoutUrl.data.body)
      } finally {
        this.loading.checkout = ''
      }
    },
    async subscribeToFreeTrial(planId: string) {
      this.loading.checkout = planId
      try {
        const checkoutUrl = await axios.get(
          `${
            import.meta.env.VITE_API_ENDPOINT
          }/plans/${planId}/subscribe/free-trial`
        )
        window.location.replace(checkoutUrl.data.body)
      } finally {
        this.loading.checkout = ''
      }
    },
    isCheckoutLoading(planId: string) {
      return this.loading.checkout === planId
    }
  }
})
</script>
