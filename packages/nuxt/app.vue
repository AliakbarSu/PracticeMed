<template>
  <NuxtLayout>
    <UIAlertsError v-if="UIStore.error" />
    <UILoading />
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts" setup>
import { useUIStore } from './src/store/UI'
import { useAuthStore } from './src/store/auth'
import { useAppStore } from './src/store/main'
import { buildAuthClient, getAuthToken } from './src/auth/index'

const UIStore = useUIStore()
const store = useAppStore()
const authStore = useAuthStore()

onMounted(async () => {
  if (process.client) {
    try {
      authStore.$reset()
      const client = await buildAuthClient()
      client.checkSession()
      const authToken = await getAuthToken()
      const user = await client.getUser()
      authStore.setToken(authToken)
      authStore.setUser(user)
    } catch (e) {
      console.log('Something went wrong when checking session', e)
    }
  }
})
watch(
  () => authStore.isAuthenticated,
  (isAuth) => {
    if (isAuth) {
      store.fetchProfileData()
      store.fetchPortalLink()
    }
  }
)
</script>
