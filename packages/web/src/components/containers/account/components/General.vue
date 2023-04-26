<template>
  <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
    <div
      class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none"
    >
      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">General</h2>
        <p class="mt-1 text-sm leading-6 text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>

        <dl
          class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
        >
          <SkeletonLoading v-if="loading" />
          <div v-if="!loading" class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Full name
            </dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-900">{{ profile?.name }}</div>
              <!-- <button
                type="button"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Update
              </button> -->
            </dd>
          </div>
          <div v-if="!loading" class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Email address
            </dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-900">{{ profile?.email }}</div>
              <!-- <button
                type="button"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Update
              </button> -->
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import type { Profile } from '@/types/user'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import SkeletonLoading from './UI/Loading/skeletonLoading.vue'

export default defineComponent({
  props: {
    loading: Boolean,
    profile: {
      type: Object as PropType<Profile>
    }
  },
  components: {
    SkeletonLoading
  }
})
</script>
