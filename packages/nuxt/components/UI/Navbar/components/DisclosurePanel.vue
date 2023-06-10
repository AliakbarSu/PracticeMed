<template>
  <DisclosurePanel class="md:hidden">
    <div class="space-y-1 pb-3 pt-2">
      <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
      <DisclosureButton
        v-if="isAuth"
        as="span"
        :class="{
          'border-l-4': isActive('/dashboard'),
          'border-indigo-500': isActive('/dashboard')
        }"
        class="cursor-pointer block bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
        @click="goTo('/dashboard')"
        >Dashboard</DisclosureButton
      >
      <div class="space-y-1 p-2">
        <DisclosureButton as="div">
          <RouterLink
            v-if="!hideTrialButton"
            as="button"
            to="/plans"
            class="w-full relative inline-flex justify-center items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 mr-6 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Start Free Trial
          </RouterLink>
        </DisclosureButton>
      </div>
      <div class="space-y-1 pb-3 p-2 pt-0" v-if="!isAuth">
        <DisclosureButton as="div">
          <button
            @click="() => loginWithRedirect()"
            type="button"
            class="w-full relative inline-flex justify-center items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log In
          </button>
        </DisclosureButton>
        <DisclosureButton as="div">
          <button
            @click="() => signup()"
            type="button"
            class="w-full relative inline-flex justify-center items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </DisclosureButton>
      </div>
    </div>
    <div v-if="isAuth" class="border-t border-gray-200 pb-3 pt-4">
      <div class="flex items-center px-4 sm:px-6">
        <div class="flex-shrink-0">
          <img
            class="h-10 w-10 rounded-full"
            :src="user?.value.picture"
            alt=""
          />
        </div>
        <div class="ml-3">
          <div class="text-base font-medium text-gray-800">
            {{ user?.value.nickname }}
          </div>
          <div class="text-sm font-medium text-gray-500">
            {{ user?.value.email }}
          </div>
        </div>
        <button
          type="button"
          class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="mt-3 space-y-1">
        <DisclosureButton
          as="a"
          href="#"
          class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
          @click="goTo('/account')"
          >Settings</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="#"
          class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
          @click="onLogout"
          >Sign out</DisclosureButton
        >
      </div>
    </div>
  </DisclosurePanel>
</template>

<script lang="ts" setup>
import { useAppStore } from '../../../../src/store/main'
import { usePlansStore } from '../../../../src/store/plans'
import { DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/24/outline'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { logout, signup, loginWithRedirect } from '../../../../src/auth/index'
import { useAuth0 } from '@auth0/auth0-vue'
const router = useRouter()
const store = useAppStore()
const plansStore = usePlansStore()

const { isAuth } = storeToRefs(store)
const route = useRoute()

const { user } = process.client ? useAuth0() : { user: null }

const goTo = (link: string) => {
  router.push(link)
}
const onLogout = () => {
  logout().then(() => {
    store.$reset()
  })
}
const hideTrialButton = computed(
  () => plansStore.hasActivePlan == true || route.fullPath == '/plans'
)

const isActive = (path: string) => {
  return router.currentRoute.value.path === path
}
</script>