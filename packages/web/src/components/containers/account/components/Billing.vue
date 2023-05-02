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

<script lang="ts" setup>
import SkeletonLoading from './UI/Loading/skeletonLoading.vue'
import SubscribeCTA from './UI/CTA/Subscribe.vue'
import { useAppStore } from '@/store/main'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { watch, onMounted } from 'vue'

const store = useAppStore()

const { portalLink } = storeToRefs(store)

const subscribed = computed(() => portalLink.value !== null)

watch(portalLink, () => {
  navigate()
})

const navigate = () => {
  if (subscribed.value && portalLink.value) {
    window.location.replace(portalLink.value)
  }
}

onMounted(() => {
  navigate()
})
</script>
