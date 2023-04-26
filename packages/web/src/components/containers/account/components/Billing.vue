<template>
  <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
    <div
      class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none"
    >
      <SubscribeCTA
        heading="You do not have a subscription yet!"
        description="Once you subscribe, you can manage your subscription here."
        v-if="!subscribed"
      />
      <div v-if="subscribed">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Billing</h2>
        <p class="mt-1 text-sm leading-6 text-gray-500">
          Manage your subscription - view status, upgrade/downgrade, and cancel
          anytime.
        </p>

        <dl
          class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
        >
          <SkeletonLoading v-if="true" />
        </dl>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios, { AxiosError } from 'axios'
import SkeletonLoading from './UI/Loading/skeletonLoading.vue'
import SubscribeCTA from './UI/CTA/Subscribe.vue'

export default defineComponent({
  components: {
    SkeletonLoading,
    SubscribeCTA
  },
  data() {
    return {
      loading: false,
      subscribed: true
    }
  },
  created() {
    this.getPortalLink()
  },
  methods: {
    async getPortalLink() {
      try {
        this.loading = true
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/billing/manage`
        )
        const link = response.data.body
        window.location.replace(link)
      } catch (err: any) {
        const statusCode = err.response.status
        if (statusCode == 400) {
          this.subscribed = false
          return
        }
        this.loading = false
      }
    }
  }
})
</script>
