import type { Test } from '@/types/test'
import type { Profile, UserAppMetadata } from '@/types/user'
import { defineStore } from 'pinia'
import { useUIStore } from './UI'
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
  const UIStore = useUIStore()

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
      UIStore.startLoadingTestsHistory()
      testsHistory.value = await loadTestHistory()
      UIStore.testsHistoryLoaded()
    } catch (err) {
      error.value = err as Error
    } finally {
      UIStore.stopLoadingTestsHistory()
    }
  }

  const fetchTests = async () => {
    try {
      UIStore.startLoadingTests()
      tests.value = await loadTests()
      UIStore.testsLoaded()
    } catch (err) {
      error.value = err as Error
    } finally {
      UIStore.stopLoadingTests()
    }
  }

  const fetchPortalLink = async () => {
    try {
      portalLink.value = await loadPortalLink()
    } finally {
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
