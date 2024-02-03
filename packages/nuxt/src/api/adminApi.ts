import { useAuthStore } from '../store/auth'

export const fetchUsersApi = async () => {
  const {
    public: { api_endpoint }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await useFetch<{ body: [] }>(`${api_endpoint}/admin/users`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authStore.token}` }
  })
  return response.data.value?.body
}
