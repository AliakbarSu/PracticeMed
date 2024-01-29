<template>
  <ClientOnly>
    <Disclosure as="nav" class="bg-white shadow mb-1" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex w-full md:w-auto">
            <div class="-ml-2 mr-2 flex items-center md:hidden">
              <!-- Mobile menu button -->
              <UINavbarComponentsMobileButton :open="open" />
            </div>
            <div
              class="cursor-pointer flex flex-shrink-0 items-center order-1"
              @click="goTo('/')"
            >
              <img
                class="block h-28 w-auto lg:hidden"
                src="https://res.cloudinary.com/dxuf2ssx6/image/upload/v1682296708/practiceMed/Illustrations/Practice_Med-logo.png"
                alt="Practice Med"
              />
              <img
                class="hidden h-32 w-auto lg:block"
                src="https://res.cloudinary.com/dxuf2ssx6/image/upload/v1682296708/practiceMed/Illustrations/Practice_Med-logo.png"
                alt="Practice Med"
              />
            </div>
            <div
              class="md:ml-6 flex grow md:grow-0 space-x-2 md:space-x-8 gap-2 md:gap-0 md:order-1"
            >
              <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
              <NuxtLink
                v-if="isAuth"
                active-class="border-indigo-500 border-b-2"
                to="/dashboard"
                class="hidden md:inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >Tests</NuxtLink
              >
              <NuxtLink
                active-class="border-indigo-500 border-b-2"
                to="/plans"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >Plans</NuxtLink
              >
              <NuxtLink
                active-class="border-indigo-500 border-b-2"
                to="/resources"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >Resources</NuxtLink
              >
              <NuxtLink
                active-class="border-indigo-500 border-b-2"
                to="/landing/audio-mock"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >Audio MCQs</NuxtLink
              >
            </div>
          </div>
          <div class="hidden md:flex items-center">
            <div class="flex-shrink-0">
              <NuxtLink
                v-if="showTrialButton"
                as="button"
                to="/plans"
                class="hidden relative sm:inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 mr-6 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Start Free Trial
              </NuxtLink>
              <button
                v-if="!isAuth"
                @click="signup"
                type="button"
                key="signup"
                class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
            <div class="flex-shrink-0" v-if="!isAuth">
              <button
                @click="login"
                type="button"
                class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </button>
            </div>
            <!-- <div v-if="isAuth" class="flex-shrink-0">
            <button
              type="button"
              class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
              New Test
            </button>
          </div> -->
            <div
              v-if="isAuth"
              class="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center"
            >
              <button
                type="button"
                class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <UINavbarComponentsProfileDropdown />
            </div>
          </div>
        </div>
      </div>
      <UINavbarComponentsDisclosurePanel />
    </Disclosure>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { Disclosure } from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/24/outline'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { usePlansStore } from '../../../src/store/plans'
import { useAuthStore } from '../../../src/store/auth'
import {
  signup as signupWithRedirect,
  loginWithRedirect
} from '../../../src/auth/index'

const plansStore = usePlansStore()
const authStore = useAuthStore()

const router = useRouter()
const route = useRoute()
const showTrialButton = ref(false)

const isAuth = computed(() => authStore.isAuthenticated)

const login = async () => {
  await loginWithRedirect()
}

const signup = async () => {
  await signupWithRedirect()
}

const goTo = (link: string) => {
  router.push(link)
}
watch(
  [() => plansStore.userHasActivePlan, () => route.fullPath],
  ([hasActivePlan, fullPath]) => {
    if (!hasActivePlan || (!hasActivePlan && fullPath === '/plans')) {
      showTrialButton.value = true
    } else {
      showTrialButton.value = false
    }
  }
)
</script>
