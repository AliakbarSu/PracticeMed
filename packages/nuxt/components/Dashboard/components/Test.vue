<template>
  <article class="flex flex-col items-start justify-between">
    <div class="relative w-full">
      <img
        :src="test?.thumbnail[0].url"
        alt=""
        class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
      />
      <div
        class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"
      />
    </div>
    <div class="max-w-xl">
      <div class="mt-8 flex items-center gap-x-4 text-xs">
        <span
          class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >AMC</span
        >
      </div>
      <div class="group relative">
        <h3
          class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
        >
          <span class="absolute inset-0" />
          {{ test?.name }}
        </h3>
        <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {{ test?.description }}
        </p>
      </div>
      <!-- <div class="relative mt-8 flex items-center gap-x-4">
        <img
          :src="test?.thumbnail[0].url"
          alt=""
          class="h-10 w-10 rounded-full bg-gray-100"
        /> -->
      <!-- <div class="text-sm leading-6">
          <p class="font-semibold text-gray-900">
            <a :href="post.author.href">
              <span class="absolute inset-0" />
              {{ post.author.name }}
            </a>
          </p>
          <p class="text-gray-600">{{ post.author.role }}</p>
        </div> -->
      <!-- </div> -->
      <div class="py-4">
        <RouterLink
          as="button"
          @click="takeTest(test)"
          to="#"
          class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >Take Test</RouterLink
        >
      </div>
    </div>
  </article>
  <!-- <div class="flex items-center sm:items-start">
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
  </div> -->

  <!-- <div class="mt-6 sm:flex sm:justify-end">
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
  </div> -->
</template>

<script lang="ts" setup>
import type { Test } from '../../../src/types/test'
import { useRouter } from 'vue-router'
import type { PropType } from 'vue'
import { usePlansStore } from '../../../src/store/plans'

const router = useRouter()
const plansStore = usePlansStore()

const { test } = defineProps({
  test: {
    type: Object as PropType<Test>
  }
})

const takeTest = (test?: Test) => {
  if (plansStore.userHasActivePlan === false) {
    router.push('/plans')
  } else {
    router.push(`/test/${test?.id}`)
  }
}
</script>
