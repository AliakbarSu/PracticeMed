import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const error = ref<Error | null>(null)
  const test = reactive({ loading: false })
  const tests = reactive({ loading: false })
  const testsHistory = reactive({ loading: false })
  const $reset = () => {
    error.value = null
    test.loading = false
    tests.loading = false
    testsHistory.loading = false
  }

  const startLoadingTest = () => {
    test.loading = true
  }
  const stopLoadingTest = () => {
    test.loading = false
  }

  const startLoadingTests = () => {
    tests.loading = true
  }

  const stopLoadingTests = () => {
    tests.loading = false
  }

  const startLoadingTestsHistory = () => {
    testsHistory.loading = true
  }

  const stopLoadingTestsHistory = () => {
    testsHistory.loading = false
  }

  return {
    error,
    test,
    startLoadingTest,
    stopLoadingTest,
    tests,
    startLoadingTests,
    stopLoadingTests,
    testsHistory,
    startLoadingTestsHistory,
    stopLoadingTestsHistory,
    $reset
  }
})
