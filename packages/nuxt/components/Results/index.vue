<template>
  <div class="min-h-full bg-gray-100">
    <UIAlertsError v-if="UIStore.error" />
    <!-- <div class="p-4">
      <Banner :pass="pass" />
    </div> -->
    <div class="py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1
            class="text-3xl font-bold leading-tight tracking-tight text-gray-900"
          >
            Test Results
          </h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <!-- <h3 class="text-base font-semibold leading-6 text-gray-900">
              Last 30 days
            </h3> -->
            <dl
              class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0"
            >
              <div
                v-for="item in testStats"
                :key="item.name"
                class="px-4 py-5 sm:p-6"
              >
                <dt class="text-base font-normal text-gray-900">
                  {{ item.name }}
                </dt>
                <ResultsComponentsUILoadingContentSkeleton v-if="loading" />
                <dd
                  v-if="!loading"
                  class="mt-1 flex items-baseline justify-between md:block lg:flex"
                >
                  <div
                    class="flex items-baseline text-2xl font-semibold text-indigo-600"
                  >
                    {{ item.stat }}
                    <span class="ml-2 text-sm font-medium text-gray-500"
                      >from {{ item.previousStat }}</span
                    >
                  </div>

                  <div
                    :class="[
                      item.changeType === 'increase'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800',
                      'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                    ]"
                  >
                    <ArrowUpIcon
                      v-if="item.changeType === 'increase'"
                      class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                    <ArrowDownIcon
                      v-else
                      class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                    <span class="sr-only">
                      {{
                        item.changeType === 'increase'
                          ? 'Increased'
                          : 'Decreased'
                      }}
                      by
                    </span>
                    {{ item.change }}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
          <dl
            class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-2 md:divide-x md:divide-y-0"
          >
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-base font-normal text-gray-900">
                Subject-wise Percentage
              </dt>
              <dd
                class="mt-1 flex h-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="loading" />
                <ResultsComponentsPie
                  v-if="!loading"
                  :data="correctResponseRatePerField.datasets"
                  :labels="correctResponseRatePerField.labels"
                />
              </dd>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-base font-normal text-gray-900">
                Overall Question Accuracy
              </dt>
              <dd
                class="mt-1 h-full items-center flex justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="loading" />
                <ResultsComponentsLine
                  v-if="!loading"
                  :data="accuracyOverTime.datasets"
                  :labels="accuracyOverTime.labels"
                />
              </dd>
            </div>
          </dl>
          <dl
            class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-2 md:divide-x md:divide-y-0"
          >
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-base font-normal text-gray-900">
                Overall Time Performance
              </dt>
              <dd
                class="mt-1 flex h-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="loading" />
                <ResultsComponentsLine
                  v-if="!loading"
                  :data="speedOverTime.datasets"
                  :labels="speedOverTime.labels"
                />
              </dd>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-base font-normal text-gray-900">
                Mean Subject Time
              </dt>
              <dd
                class="mt-1 flex h-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="loading" />
                <ResultsComponentsPie
                  v-if="!loading"
                  :data="averageCategoryTiming.datasets"
                  :labels="averageCategoryTiming.labels"
                  :options="averageCategoryTiming.options"
                />
              </dd>
            </div>
          </dl>
          <dl
            class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-2 md:divide-x md:divide-y-0"
          >
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-base font-normal text-gray-900">
                Incorrect Response Count
              </dt>
              <dd
                class="mt-1 flex h-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="loading" />
                <ResultsComponentsPie
                  v-if="!loading"
                  :data="incorrectResponseCountPerSubject.datasets"
                  :labels="incorrectResponseCountPerSubject.labels"
                  :options="correctResponseCountPerSubject.options"
                />
              </dd>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-base font-normal text-gray-900">
                Correct Response Count
              </dt>
              <dd
                class="mt-1 flex h-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="loading" />
                <ResultsComponentsPie
                  v-if="!loading"
                  :data="correctResponseCountPerSubject.datasets"
                  :labels="correctResponseCountPerSubject.labels"
                  :options="correctResponseCountPerSubject.options"
                />
              </dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'
import type { UserAppMetadata } from '@/types/user'
import type { Stats } from '../../src/types/test'
import { useUIStore } from '../../src/store/UI'

export default defineComponent({
  setup() {
    const UIStore = useUIStore()
    return { UIStore }
  },
  created() {
    this.fetchTestHistory()
  },
  data: () => {
    return {
      loading: false,
      testHistory: {} as UserAppMetadata['test_history'][0],
      previous_tests: [] as UserAppMetadata['test_history'],
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
  },
  components: {
    ArrowDownIcon,
    ArrowUpIcon
  },
  methods: {
    navigateToDashboard() {
      this.$router.push('/dashboard')
    },
    printResults() {
      window.print()
    },
    async fetchTestHistory() {
      const { api_endpoint } = useRuntimeConfig()
      this.loading = true
      const resultId = this.$route.params.id || ''
      try {
        const token = await this.$auth0.getAccessTokenSilently()
        const response = await axios.get(`${api_endpoint}/tests/history`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const testHistoryArray = response.data
          .body as unknown as UserAppMetadata['test_history']
        this.previous_tests = testHistoryArray
        const matchingTestHistory = testHistoryArray.find(
          ({ id }: any) => id === resultId
        ) as UserAppMetadata['test_history'][0]
        if (!matchingTestHistory) {
          this.UIStore.error = new Error(
            'Failed to find a matching test result'
          )
          return
        }
        this.testHistory = matchingTestHistory
        this.loading = false
      } catch (err) {
        this.UIStore.error = new Error(err as string)
      }
    },
    calculateChangeRate(key: keyof Stats) {
      const sortedTestHistory = this.previous_tests.sort(
        (a, b) => Number(a.timestamp) - Number(b.timestamp)
      )
      const currentHistoryIndex = sortedTestHistory.findIndex(
        ({ test_id }) => test_id === this.testHistory.test_id
      )
      const previousTest = sortedTestHistory[currentHistoryIndex + 1]
      if (!previousTest) return 0
      return (
        Number(this.testHistory.stats[key]) - Number(previousTest.stats[key])
      )
    },
    calculateChangeType(key: keyof Stats) {
      // if (this.calculateChangeRate(key) === 0) return 'same'
      return this.calculateChangeRate(key) > 0 ? 'increase' : 'decrease'
    }
  },
  computed: {
    pass() {
      return this.testHistory.result === 'pass'
    },
    testStats() {
      if (this.loading) {
        return [
          { name: 'Total Points' },
          { name: 'Average Time' },
          { name: 'Average Time' }
        ] as any[]
      }
      if (!this.testHistory?.stats) return []
      return [
        {
          name: 'Total Points',
          stat: this.testHistory.stats.totalPoints,
          previousStat: this.testHistory.stats.testScore,
          change: this.calculateChangeRate('totalPoints'),
          changeType: this.calculateChangeType('totalPoints')
        },
        {
          name: 'Average Time',
          stat: this.testHistory.stats.averageTimeTaken.toFixed(2),
          previousStat: this.testHistory.stats.averageTimeTaken.toFixed(2),
          change: this.calculateChangeRate('averageTimeTaken').toFixed(2),
          changeType: this.calculateChangeType('averageTimeTaken')
        },
        {
          name: 'Subjects Average Time',
          stat: this.testHistory.stats.fieldsAverageTime.toFixed(2),
          previousStat: this.testHistory.stats.fieldsAverageTime.toFixed(2),
          change: this.calculateChangeRate('fieldsAverageTime').toFixed(2),
          changeType: this.calculateChangeType('fieldsAverageTime')
        }
      ]
    },
    correctResponseCountPerSubject() {
      const labels = Object.keys(
        this.testHistory.stats.correctResponseCountPerField
      )
      const values = labels.map(
        (key) => this.testHistory.stats.correctResponseCountPerField[key]
      )
      return {
        labels: labels,
        datasets: values,
        options: {
          dataLabels: {
            formatter: function (val: any, opts: any) {
              return opts.w.config.series[opts.seriesIndex]
            }
          }
        }
      }
    },
    correctResponseRatePerSubject() {
      const labels = Object.keys(
        this.testHistory.stats.correctResponseRatePerField
      )
      return {
        labels,
        datasets: labels.map(
          (key) => this.testHistory.stats.correctResponseRatePerField[key]
        )
      }
    },
    incorrectResponseCountPerSubject() {
      const labels = Object.keys(
        this.testHistory.stats.incorrectResponseCountPerField
      )
      return {
        labels,
        datasets: labels.map(
          (key) => this.testHistory.stats.incorrectResponseCountPerField[key]
        )
      }
    },
    averageCategoryTiming() {
      const labels = Object.keys(
        this.testHistory.stats.averageTimeTakenPerField
      )
      return {
        labels,
        datasets: labels.map(
          (key) => this.testHistory.stats.averageTimeTakenPerField[key]
        ),
        options: {
          dataLabels: {
            formatter: function (val: any, opts: any) {
              return opts.w.config.series[opts.seriesIndex] + ' Mins'
            }
          }
        }
      }
    },
    accuracyOverTime() {
      const labels = Object.keys(
        this.testHistory.stats.correctAnswersByMinuteInterval
      ).map((key) => {
        return (Number(key) / 600000).toFixed(2) + ' Mins'
      })
      const values = Object.keys(
        this.testHistory.stats.correctAnswersByMinuteInterval
      ).map((key) => {
        return this.testHistory.stats.correctAnswersByMinuteInterval[key]
      })
      return {
        labels,
        datasets: values
      }
    },
    speedOverTime() {
      const labels = Object.keys(
        this.testHistory.stats.speedByMinuteInterval
      ).map((key) => {
        return (
          Number(this.testHistory.stats.speedByMinuteInterval[key]).toFixed(2) +
          ' Mins'
        )
      })
      return {
        labels,
        datasets: Object.keys(this.testHistory.stats.speedByMinuteInterval).map(
          (key) => Number(this.testHistory.stats.speedByMinuteInterval[key])
        )
      }
    },
    correctResponseRatePerField() {
      const labels = Object.keys(
        this.testHistory.stats.correctResponseRatePerField
      )
      return {
        labels,
        datasets: labels.map(
          (key) => this.testHistory.stats.correctResponseRatePerField[key]
        )
      }
    }
  }
})
</script>
