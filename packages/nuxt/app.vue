<template>
  <div>
    <NuxtLayout>
      <UIAlertsError v-if="error" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
import { useUIStore } from './src/store/UI'
import { useAppStore } from './src/store/main'
import { storeToRefs } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'

const store = useAppStore()
const UIStore = useUIStore()

const { authToken } = storeToRefs(store)
const { error } = storeToRefs(UIStore)

// Composition API
const auth0 = process.client ? useAuth0() : undefined
const isAuthenticated = computed(() => {
  return auth0?.isAuthenticated.value
})

watch(isAuthenticated, async () => {
  if (isAuthenticated.value) {
    const token = await auth0?.getAccessTokenSilently()
    store.setAuthToken(token || '')
  }
})
if (isAuthenticated.value) {
  const token = await auth0?.getAccessTokenSilently()
  store.setAuthToken(token || '')
}

watch(authToken, () => {
  if (authToken.value) {
    store.fetchProfileData()
    store.fetchTests()
    store.fetchTestsHistory()
    store.fetchPortalLink()
  }
})
</script>
