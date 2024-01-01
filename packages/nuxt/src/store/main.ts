import type { Test } from '@/types/test'
import type { Profile, UserAppMetadata } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  loadProfileData,
  loadTestHistory,
  loadPortalLink,
  loadTests
} from '../api/profileApi'

export const useAppStore = defineStore('app', () => {
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const profile = ref<Profile | null>(null)
  const portalLink = ref<string | null>(null)
  const testsHistory = ref<UserAppMetadata['test_history']>([])
  const tests = ref<Test[]>([])

  function $reset() {
    profile.value = null
    testsHistory.value = []
    tests.value = []
    portalLink.value = null
  }

  const fetchProfileData = async () => {
    try {
      loading.value = true
      profile.value = await loadProfileData()
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  const fetchTestsHistory = async () => {
    try {
      loading.value = true
      testsHistory.value = await loadTestHistory()
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  const fetchTests = async () => {
    try {
      tests.value = await loadTests()
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  const fetchPortalLink = async () => {
    try {
      loading.value = true
      portalLink.value = await loadPortalLink()
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
    $reset,
    portalLink
  }
})
