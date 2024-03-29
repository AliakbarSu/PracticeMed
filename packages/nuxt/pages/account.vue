<template>
  <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
    <aside
      class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20"
    >
      <nav class="flex-none px-4 sm:px-6 lg:px-0">
        <ul
          class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
          role="list"
        >
          <li v-for="item in secondaryNavigation" :key="item.name">
            <NuxtLink
              :class="[
                isActive(item.name)
                  ? 'bg-gray-50 text-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold',
              ]"
              :href="item.href"
              :to="item.href"
              as="a"
              @click="setItem(item.name)"
            >
              <component
                :is="item.icon"
                :class="[
                  isActive(item.name)
                    ? 'text-indigo-600'
                    : 'text-gray-400 group-hover:text-indigo-600',
                  'h-6 w-6 shrink-0',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import {
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";
import { useAppStore } from "../src/store/main";
import { useAuthStore } from "../src/store/auth";

const secondaryNavigation = [
  {
    name: "General",
    href: "/account",
    icon: UserCircleIcon,
    current: true,
  },
  {
    name: "Security",
    href: "/account/security",
    icon: FingerPrintIcon,
    current: false,
  },
  { name: "Plan", href: "/account/plans", icon: CubeIcon, current: false },
  {
    name: "Billing",
    href: "/account/billing",
    icon: CreditCardIcon,
    current: false,
  },
];

const store = useAppStore();
const authStore = useAuthStore();
const currentItem = ref("General");

const setItem = (item: string) => {
  currentItem.value = item;
};

const isActive = (item: string) => {
  return currentItem.value == item;
};

watch(
  [() => authStore.isAuthenticated, () => store.portalLink],
  ([isAuth, portalLink]) => {
    if (isAuth && !portalLink) {
      store.fetchPortalLink();
    }
  },
  {
    immediate: true,
  },
);
</script>
