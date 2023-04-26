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

  <div class="mt-6 sm:flex sm:justify-between">
    <div class="flex items-center">
      <!-- <CheckCircleIcon class="h-5 w-5 text-green-500" aria-hidden="true" /> -->
      <!-- <p class="ml-2 text-sm font-medium text-gray-500">
                          Set on
                          <time :datetime="order.deliveredDatetime">{{
                            order.deliveredDate
                          }}</time>
                        </p> -->
    </div>

    <div
      class="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0"
    >
      <div class="flex flex-1 justify-center">
        <a
          @click="takeTest(test?.id || '')"
          href="#"
          class="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
          >Take Test</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import type { Test } from '@/types/test'
import type { PropType } from 'vue'

export default {
  props: {
    test: {
      type: Object as PropType<Test>
    }
  },
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    EllipsisVerticalIcon,
    CheckCircleIcon
  },
  methods: {
    takeTest(testId: string) {
      this.$router.push(`/test/${testId}`)
    }
  }
}
</script>
