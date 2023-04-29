<template>
  <div class="bg-white py-32 sm:py-46">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="grid grid-cols-1 items-center sm:px-0 md:px-22 lg:px-29">
        <div class="mx-auto w-full lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900">
            Instructions before you begin
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            {{ test?.instructions }}
          </p>
          <div class="pt-15">
            <div class="">
              <h3 class="text-base font-semibold leading-7 text-gray-900">
                Test Information
              </h3>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Important information.
              </p>
            </div>
            <div class="mt-6 border-t border-gray-100">
              <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Name
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ test?.name }}
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Duration
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ test?.timeLimit }} hours
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div class="mt-8 flex items-center gap-x-6">
            <a
              @click="$emit('start')"
              class="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >Start the test</a
            >
            <!-- <a @click="" class="cursor-pointer text-sm font-semibold text-gray-900"
              >Dot it later <span aria-hidden="true">&rarr;</span></a
            > -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { Test } from '@/types/test'

const router = useRouter()

const { test } = defineProps({
  test: {
    type: Object as PropType<Test>
  }
})
const doItLater = () => {
  router.push('/dashboard')
}
</script>
