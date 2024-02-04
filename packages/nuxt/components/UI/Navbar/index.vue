<template>
  <Disclosure v-slot="{ open }" as="nav" class="bg-white shadow mb-1">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex w-full md:w-auto">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <ClientOnly>
              <UINavbarComponentsMobileButton :open="open" />
            </ClientOnly>
          </div>
          <div
            class="cursor-pointer flex flex-shrink-0 items-center order-1"
            @click="goTo('/')"
          >
            <img
              alt="Practice Med"
              class="block h-28 w-auto lg:hidden"
              src="https://res.cloudinary.com/dxuf2ssx6/image/upload/v1682296708/practiceMed/Illustrations/Practice_Med-logo.png"
            />
            <img
              alt="Practice Med"
              class="hidden h-32 w-auto lg:block"
              src="https://res.cloudinary.com/dxuf2ssx6/image/upload/v1682296708/practiceMed/Illustrations/Practice_Med-logo.png"
            />
          </div>
          <div
            class="md:ml-6 flex grow md:grow-0 space-x-2 md:space-x-8 gap-2 md:gap-0 md:order-1"
          >
            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <ClientOnly>
              <NuxtLink
                v-if="isAuth"
                active-class="border-indigo-500 border-b-2"
                as="a"
                class="hidden md:inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                to="/dashboard"
                >Tests
              </NuxtLink>

              <NuxtLink
                active-class="border-indigo-500 border-b-2"
                as="a"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                to="/plans"
                >Plans
              </NuxtLink>
              <NuxtLink
                active-class="border-indigo-500 border-b-2"
                as="a"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                to="/resources"
                >Resources
              </NuxtLink>
              <NuxtLink
                active-class="border-indigo-500 border-b-2"
                as="a"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                to="/landing/audio-mock"
                >Audio MCQs
              </NuxtLink>
            </ClientOnly>
          </div>
        </div>
        <div class="hidden md:flex items-center">
          <div class="flex-shrink-0">
            <button
              v-if="showTrialButton"
              class="hidden relative sm:inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 mr-6 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              @click="goTo('/plans')"
            >
              Start Free Trial
            </button>
            <ClientOnly>
              <button
                v-if="!isAuth"
                key="signup"
                class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="button"
                @click="signup"
              >
                Sign Up
              </button>
            </ClientOnly>
          </div>
          <ClientOnly>
            <div v-if="!isAuth" class="flex-shrink-0">
              <button
                class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="button"
                @click="login"
              >
                Log In
              </button>
            </div>
          </ClientOnly>
          <!-- <div v-if="isAuth" class="flex-shrink-0">
          <button
            type="button"
            class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
            New Test
          </button>
        </div> -->
          <ClientOnly>
            <div
              v-if="isAuth"
              class="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center"
            >
              <button
                class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="button"
              >
                <span class="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" class="h-6 w-6" />
              </button>

              <!-- Profile dropdown -->
              <UINavbarComponentsProfileDropdown />
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
    <UINavbarComponentsDisclosurePanel />
  </Disclosure>
</template>

<script lang="ts" setup>
import { Disclosure } from "@headlessui/vue";
import { BellIcon } from "@heroicons/vue/24/outline";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { usePlansStore } from "../../../src/store/plans";
import { useAuthStore } from "../../../src/store/auth";
import {
  loginWithRedirect,
  signup as signupWithRedirect,
} from "../../../src/auth/index";

const plansStore = usePlansStore();
const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();
const showTrialButton = ref(false);

const isAuth = computed(() => authStore.isAuthenticated);

const login = async () => {
  await loginWithRedirect();
};

const signup = async () => {
  await signupWithRedirect();
};

const goTo = (link: string) => {
  router.push(link);
};
watch(
  [() => plansStore.userHasActivePlan, () => route.fullPath],
  ([hasActivePlan, fullPath]) => {
    showTrialButton.value =
      !hasActivePlan || (!hasActivePlan && fullPath === "/plans");
  },
  { immediate: true },
);
</script>
