import { useAuthStore } from '../store/auth'
import type { UserAppMetadata } from '@/types/user'

export const loadProfileData = async () => {
  const {
    public: { api_endpoint }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await useFetch<{ body: string }>(
    `${api_endpoint}/user/profile`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${authStore.token}` }
    }
  )
  return JSON.parse(response.data.value?.body || '')
}

export const loadTestHistory = async () => {
  const {
    public: { api_endpoint }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await useFetch<{
    body: UserAppMetadata['test_history']
  }>(`${api_endpoint}/tests/history`, {
    headers: { Authorization: `Bearer ${authStore.token}` }
  })
  return response.data.value?.body || []
}

export const loadPortalLink = async () => {
  const {
    public: { api_endpoint }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await useFetch<{ body: string }>(
    `${api_endpoint}/billing/manage`,
    {
      headers: { Authorization: `Bearer ${authStore.token}` }
    }
  )
  return response.data.value?.body || null
}

export const loadTests = async () => {
  const {
    public: { api_endpoint }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await useFetch<{ body: string }>(`${api_endpoint}/tests`, {
    headers: { Authorization: `Bearer ${authStore.token}` }
  })
  return JSON.parse(response.data.value?.body || '')
}
