import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const error = ref<Error | null>(null)
  const test = reactive({ loading: false })
  const dashboard = reactive({ loading: false })
  const $reset = () => {
    error.value = null
    test.loading = false
    dashboard.loading = false
  }

  const startLoadingTest = () => {
    test.loading = true
  }
  const stopLoadingTest = () => {
    test.loading = false
  }

  const startLoadingDashboard = () => {
    dashboard.loading = true
  }

  const stopLoadingDashboard = () => {
    dashboard.loading = false
  }

  return {
    error,
    test,
    startLoadingTest,
    stopLoadingTest,
    dashboard,
    startLoadingDashboard,
    stopLoadingDashboard,
    $reset
  }
})
