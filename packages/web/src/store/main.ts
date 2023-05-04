import type { Test } from '@/types/test'
import type { Profile, UserAppMetadata } from '@/types/user'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const profile = ref<Profile | null>(null)
  const portalLink = ref<string | null>(null)
  const authToken = ref<string | null>(null)
  const testsHistory = ref<UserAppMetadata['test_history']>([])
  const tests = ref<Test[]>([])

  const isAuth = computed(() => authToken.value !== null)

  function $reset() {
    profile.value = null
    authToken.value = null
    testsHistory.value = []
    tests.value = []
    portalLink.value = null
  }

  const setAuthToken = (token: string) => {
    authToken.value = token
  }

  const fetchProfileData = async () => {
    try {
      loading.value = true
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/user/profile`,
        { headers: { Authorization: `Bearer ${authToken.value}` } }
      )
      profile.value = JSON.parse(response.data.body)
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  const fetchTestsHistory = async () => {
    try {
      loading.value = true
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/tests/history`,
        { headers: { Authorization: `Bearer ${authToken.value}` } }
      )
      testsHistory.value = response.data.body
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  const fetchTests = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/tests`,
        { headers: { Authorization: `Bearer ${authToken.value}` } }
      )
      tests.value = JSON.parse(response.data.body)
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  const fetchPortalLink = async () => {
    try {
      loading.value = true
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/billing/manage`,
        { headers: { Authorization: `Bearer ${authToken.value}` } }
      )
      portalLink.value = response.data.body || null
    } finally {
      loading.value = false
    }
  }

  return {
    fetchProfileData,
    fetchTestsHistory,
    fetchTests,
    fetchPortalLink,
    tests,
    testsHistory,
    profile,
    loading,
    error,
    isAuth,
    $reset,
    setAuthToken,
    authToken,
    portalLink
  }
})
