import type { Test } from '@/types/test'
import type { Profile, UserAppMetadata } from '@/types/user'
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
    const config = useRuntimeConfig()
    try {
      loading.value = true
      const response = await useFetch<{ body: string }>(
        `${config.public.api_endpoint}/user/profile`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${authToken.value}` }
        }
      )
      profile.value = JSON.parse(response.data.value?.body || '')
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  const fetchTestsHistory = async () => {
    const config = useRuntimeConfig()
    try {
      loading.value = true
      const response = await useFetch<{
        body: UserAppMetadata['test_history']
      }>(`${config.public.api_endpoint}/tests/history`, {
        headers: { Authorization: `Bearer ${authToken.value}` }
      })
      testsHistory.value = response.data.value?.body || []
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  const fetchTests = async () => {
    const config = useRuntimeConfig()
    try {
      const response = await useFetch<{ body: string }>(
        `${config.public.api_endpoint}/tests`,
        {
          headers: { Authorization: `Bearer ${authToken.value}` }
        }
      )
      tests.value = JSON.parse(response.data.value?.body || '')
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  const fetchPortalLink = async () => {
    const config = useRuntimeConfig()
    try {
      loading.value = true
      const response = await useFetch<{ body: string }>(
        `${config.public.api_endpoint}/billing/manage`,
        {
          headers: { Authorization: `Bearer ${authToken.value}` }
        }
      )
      portalLink.value = response.data.value?.body || null
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