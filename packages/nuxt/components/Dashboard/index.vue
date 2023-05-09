<template>
  <div class="bg-white">
    <div class="py-16 sm:py-24">
      <div class="mx-auto max-w-7xl sm:px-2 lg:px-8">
        <div class="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            Dashboard
          </h1>
          <p class="mt-2 text-sm text-gray-500">
            Track your progress by reviewing previous tests or take a new one.
          </p>
        </div>
      </div>

      <div class="mt-16">
        <h2 class="sr-only">Recent orders</h2>
        <div class="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div class="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
            <div
              class="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
            >
              <div
                class="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6"
              >
                <Menu as="div" class="relative flex lg:hidden">
                  <div class="flex items-center">
                    <MenuButton
                      class="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500"
                    >
                      <EllipsisVerticalIcon
                        class="h-6 w-6"
                        aria-hidden="true"
                      />
                    </MenuButton>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <a
                            @click="setCurrentView('tests')"
                            :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            ]"
                            >Available Tests</a
                          >
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <a
                            @click="setCurrentView('history')"
                            :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            ]"
                            >Previous Tests</a
                          >
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>

                <div
                  class="hidden lg:col-span-2 lg:flex lg:items-center lg:space-x-4"
                >
                  <a
                    href="#"
                    @click="setCurrentView('tests')"
                    class="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span>Available Tests</span>
                  </a>
                  <a
                    href="#"
                    @click="setCurrentView('history')"
                    class="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span>Previous Tests</span>
                  </a>
                </div>
              </div>

              <!-- Products -->
              <h4 class="sr-only">Items</h4>
              <ul role="list" class="divide-y divide-gray-200">
                <DashboardComponentsUILoadingSkeleton v-if="loading" />
                <li
                  v-if="state.currentView === 'tests'"
                  v-for="test in tests"
                  :key="test.id"
                  class="p-4 sm:p-6"
                >
                  <DashboardComponentsTest :test="test" />
                </li>
                <LoadingSkeleton v-if="loading" />
                <DashboardComponentsUICTANoTestHistory
                  v-if="(previousTests as TestType[]).length <= 0 && state.currentView === 'history'"
                />
                <li
                  v-if="state.currentView === 'history'"
                  v-for="test in previousTests"
                  :key="(test as TestType).id"
                  class="p-4 sm:p-6"
                >
                  <DashboardComponentsTestHistory :test="test" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import type { Test as TestType } from '../../src/types/test'
import { useAppStore } from '../../src/store/main'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import * as Gtag from '../../src/gtag/index'
import { usePlansStore } from '../../src/store/plans'
import { watch } from 'vue'

const route = useRoute()
const store = useAppStore()
const plansStore = usePlansStore()

const { plans } = storeToRefs(plansStore)

const { tests, testsHistory, loading } = storeToRefs(store)

const state = reactive<{ currentView: 'tests' | 'history' }>({
  currentView: 'tests'
})

const setCurrentView = (view: 'tests' | 'history') => {
  state.currentView = view
}

const previousTests = computed(() => {
  return testsHistory.value.map((testHistory) => {
    const test = tests.value.find(({ id }) => testHistory.test_id === id)
    return {
      ...test,
      ...testHistory,
      id: testHistory.id
    }
  }) as unknown
})

watch(plans, () => {
  const success = !!route.query.success || false
  const planId = route.query.id || null
  const freeTrial = route.query.free_trial || false
  if (success && planId) {
    const plan = plans.value.find(({ id }) => id === planId)
    if (!plan) return
    if (freeTrial) {
      Gtag.purchase(plan, true)
    } else {
      Gtag.purchase(plan)
    }
  }
})
</script>

<style scoped>
div[id^='headlessui-menu-items'] {
  left: 0 !important;
}
</style>
