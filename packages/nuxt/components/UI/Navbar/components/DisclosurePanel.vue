<template>
  <DisclosurePanel class="md:hidden">
    <div class="space-y-1 pb-3 pt-2">
      <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
      <DisclosureButton
        v-if="isAuth"
        :class="{
          'border-l-4': isActive('/dashboard'),
          'border-indigo-500': isActive('/dashboard'),
        }"
        as="span"
        class="cursor-pointer block bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
        @click="goTo('/dashboard')"
        >Tests
      </DisclosureButton>
      <div class="space-y-1 p-2">
        <DisclosureButton as="div">
          <RouterLink
            v-if="showTrialButton"
            as="button"
            class="w-full relative inline-flex justify-center items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 mr-6 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            to="/plans"
          >
            Start Free Trial
          </RouterLink>
        </DisclosureButton>
      </div>
      <div v-if="!isAuth" class="space-y-1 pb-3 p-2 pt-0">
        <DisclosureButton as="div">
          <button
            class="w-full relative inline-flex justify-center items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
            @click="login"
          >
            Log In
          </button>
        </DisclosureButton>
        <DisclosureButton as="div">
          <button
            class="w-full relative inline-flex justify-center items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
            @click="signup"
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
            :class="{ 'border-2 border-red-500': isAdmin }"
            :src="user?.picture"
            alt=""
            class="h-10 w-10 rounded-full"
          />
        </div>
        <div class="ml-3">
          <div class="text-base font-medium text-gray-800">
            {{ user?.nickname }}
          </div>
          <div class="text-sm font-medium text-gray-500">
            {{ user?.email }}
          </div>
        </div>
        <button
          class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="button"
        >
          <span class="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" class="h-6 w-6" />
        </button>
      </div>
      <div class="mt-3 space-y-1">
        <DisclosureButton
          as="a"
          class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
          href="#"
          @click="goTo('/account')"
          >Settings
        </DisclosureButton>
        <DisclosureButton
          as="a"
          class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
          href="#"
          @click="onLogout"
          >Sign out
        </DisclosureButton>
        <DisclosureButton v-if="isAdmin" as="div">
          <NuxtLink
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
            to="/admin"
            type="a"
          >
            Admin Panel
          </NuxtLink>
        </DisclosureButton>
      </div>
    </div>
  </DisclosurePanel>
</template>

<script lang="ts" setup>
import { usePlansStore } from "../../../../src/store/plans";
import { useAuthStore } from "../../../../src/store/auth";
import { useAppStore } from "../../../../src/store/main";
import { DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { BellIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  loginWithRedirect,
  logout,
  signup as signupWithRedirect,
} from "../../../../src/auth/index";

const router = useRouter();
const plansStore = usePlansStore();
const authStore = useAuthStore();
const appStore = useAppStore();

const route = useRoute();
const isAuth = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
const showTrialButton = ref(true);

const goTo = (link: string) => {
  router.push(link);
};
const onLogout = async () => {
  await logout();
};

const login = async () => {
  await loginWithRedirect();
};

const signup = async () => {
  await signupWithRedirect();
};

const isActive = (path: string) => router.currentRoute.value.path === path;
const isAdmin = computed(() => appStore.isAdmin);

watch(
  [() => plansStore.userHasActivePlan, () => route.fullPath],
  ([hasActivePlan, fullPath]) => {
    if (!hasActivePlan || (!hasActivePlan && fullPath === "/plans")) {
      showTrialButton.value = true;
    } else {
      showTrialButton.value = false;
    }
  },
);
</script>
