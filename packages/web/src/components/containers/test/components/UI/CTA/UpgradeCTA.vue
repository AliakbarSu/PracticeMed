<template>
  <div class="bg-white">
    <div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {{ heading }}
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
          {{ description }}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            @click="navigateToPlans"
            href="#"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Upgrade plan</a
          >
          <a
            href="#"
            @click="navigateBack"
            class="text-sm font-semibold leading-6 text-gray-900"
            >Go back</a
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
      default: 'Upgrade Your Plan to Continue Taking Tests'
    },
    description: {
      type: String,
      default:
        "We're sorry to inform you that you've reached your test limit for this billing period. To continue taking tests, you will need to upgrade your plan or wait until the end of the billing period for your subscription to renew."
    }
  },
  methods: {
    navigateToPlans() {
      this.$router.push('/plans')
    },
    navigateBack() {
      this.$router.go(-1)
    }
  }
})
</script>
