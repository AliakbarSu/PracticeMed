<template>
  <div class="flex items-center sm:items-start">
    <div
      class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40"
    >
      <img
        :src="test?.thumbnail[0].url"
        class="h-full w-full object-cover object-center"
      />
    </div>
    <div class="ml-6 flex-1 text-sm">
      <div class="font-medium text-gray-900 sm:flex sm:justify-between">
        <h5>{{ test?.name }}</h5>
      </div>
      <p class="hidden text-gray-500 sm:mt-2 sm:block">
        {{ test?.description }}
      </p>
    </div>
  </div>

  <div class="mt-6 sm:flex sm:justify-end">
    <div
      class="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0"
    >
      <div class="flex flex-1 justify-center">
        <RouterLink
          as="button"
          @click="takeTest(test)"
          to="#"
          class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >Take Test</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Test } from '@/types/test'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import type { PropType } from 'vue'
import { usePlansStore } from '@/store/plans'

const router = useRouter()

const plansStore = usePlansStore()

const { hasActivePlan } = storeToRefs(plansStore)

const { test } = defineProps({
  test: {
    type: Object as PropType<Test>
  }
})

const takeTest = (test?: Test) => {
  if (hasActivePlan.value === false) {
    router.push('/plans')
  } else {
    router.push(`/test/${test?.id}`)
  }
}
</script>
