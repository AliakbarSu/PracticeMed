<!-- <template>
  <Tabs v-on:tabClicked="activateTab">
    <v-tab-item>
      <v-container>
        <BookedTests
          v-on:takeTest="takeTest"
          v-if="isTabActive('bookedTests')"
          :tests="userTests"
        />
      </v-container>
    </v-tab-item>
    <v-tab-item>
      <v-container>
        <TestHistory :history="testHistory" v-if="isTabActive('testHistory')" />
      </v-container>
    </v-tab-item>
  </Tabs>
</template>

<script lang="ts">
import Tabs from './components/tabs/tabs.vue'
import BookedTests from './components/bookedTests/bookedTests.vue'
import TestHistory from './components/UI/test-history/test-history.vue'

export default {
  mounted() {
    this.$store.dispatch('retrieveTokenFromAuthz')
    this.$store.dispatch('fetchTests', this.userId)
    this.$store.dispatch('fetchTestHistory', this.userId)
  
  },
  data() {
    return {
      tabs: [
        { name: 'bookedTests', active: true },
        { name: 'testHistory', active: false }
      ]
    }
  },
  methods: {
    takeTest(prodId: string) {
      const testId = prodId
      this.$store
        .dispatch('loadTest', { userId: this.userId, testId })
        .then(() => {
          this.$router.push('/test')
        })
        .catch((err) => {
          console.log('failed to load the test', err)
        })
    },
    logout() {
      this.$store.dispatch('logout')
    },
    getDate(dateToParse: string) {
      var time = new Date(dateToParse)
      var date = new Date(time)
      return date.toString()
    },
    isFail(status: string) {
      return status.toLowerCase() == 'failed'
    },
    activateTab(clickedTab: string) {
      this.tabs = this.tabs.map((tb) => {
        if (tb.name.toLowerCase() == clickedTab.toLowerCase()) {
          return { ...tb, active: true }
        }
        return { ...tb, active: false }
      })
    },
    isTabActive(tabValue: string) {
      const activeTab = this.tabs.find(
        (tb) => tb.name.toLowerCase() == tabValue.toLowerCase()
      )
      return activeTab?.active
    }
  },
  components: {
    Tabs,
    BookedTests,
    TestHistory
  },
  computed: {
    totalTests() {
      return this.$store.getters.getUserTestData.totalTests
    },
    passedTests() {
      return this.$store.getters.getUserTestData.passedTests
    },
    failedTests() {
      return this.$store.getters.getUserTestData.failedTests
    },
    testsHistory() {
      return this.$store.getters.getUserTestData.testsHistory
    },
    userTests() {
      return this.$store.getters.userTests
    },
    testHistory() {
      return this.$store.getters.getTestHistory
    },
    userId() {
      return this.$store.getters.getUserId
    }
  }
}
</script>

 -->

<template>
  <div class="bg-white">
    <div class="py-16 sm:py-24">
      <div class="mx-auto max-w-7xl sm:px-2 lg:px-8">
        <div class="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            Test Dashboard
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
                <LoadingSkeleton v-if="loading" />
                <li
                  v-if="currentView === 'tests'"
                  v-for="test in tests"
                  :key="test.id"
                  class="p-4 sm:p-6"
                >
                  <Test :test="test" />
                </li>
                <LoadingSkeleton v-if="loading" />
                <li
                  v-if="currentView === 'history'"
                  v-for="test in previousTests"
                  :key="(test as TestType).id"
                  class="p-4 sm:p-6"
                >
                  <TestHistory :test="test" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import Test from './components/Test.vue'
import TestHistory from './components/TestHistory.vue'
import axios from 'axios'
import type { Test as TestType } from '@/types/test'
import type { UserAppMetadata } from '@/types/user'
import LoadingSkeleton from './components/UI/loading/skeleton.vue'

export default {
  created() {
    this.loading = true
    this.fetchTests()
    this.fetchTestHistory()
  },
  data: () => {
    return {
      loading: false,
      currentView: 'tests',
      tests: [] as TestType[],
      testsHistoryData: [] as UserAppMetadata['test_history']
    }
  },
  methods: {
    setCurrentView(view: 'tests' | 'history') {
      this.currentView = view
    },
    async fetchTests() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/tests`
        )
        this.tests = JSON.parse(response.data.body)
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    async fetchTestHistory() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/tests/history`
        )
        this.testsHistoryData = JSON.parse(response.data.body)
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    previousTests() {
      return this.testsHistoryData.map((testHistory) => {
        const test = this.tests.find(({ id }) => testHistory.test_id === id)
        return {
          ...test
        }
      }) as unknown
    }
  },
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    EllipsisVerticalIcon,
    CheckCircleIcon,
    Test,
    TestHistory,
    LoadingSkeleton
  }
}
</script>
