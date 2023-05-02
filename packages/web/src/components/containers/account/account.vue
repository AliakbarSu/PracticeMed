<template>
  <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
    <aside
      class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20"
    >
      <nav class="flex-none px-4 sm:px-6 lg:px-0">
        <ul
          role="list"
          class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
        >
          <li v-for="item in secondaryNavigation" :key="item.name">
            <a
              @click="setItem(item.name)"
              :href="item.href"
              :class="[
                isActive(item.name)
                  ? 'bg-gray-50 text-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  isActive(item.name)
                    ? 'text-indigo-600'
                    : 'text-gray-400 group-hover:text-indigo-600',
                  'h-6 w-6 shrink-0'
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    <div>
      <General
        :loading="loading"
        :profile="profile"
        v-if="currentItem == 'General'"
      />
      <Security
        :loading="loading"
        :profile="profile"
        v-if="currentItem == 'Security'"
      />
      <Plans
        :loading="loading"
        :profile="profile"
        v-if="currentItem == 'Plan'"
      />
      <Billing :profile="profile" v-if="currentItem == 'Billing'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import General from './components/General.vue'
import Security from './components/Security.vue'
import Plans from './components/Plans.vue'
import Billing from './components/Billing.vue'
import {
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon
} from '@heroicons/vue/24/outline'
import { useAppStore } from '@/store/main'
import { storeToRefs } from 'pinia'
const secondaryNavigation = [
  { name: 'General', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Security', href: '#', icon: FingerPrintIcon, current: false },
  { name: 'Plan', href: '#', icon: CubeIcon, current: false },
  { name: 'Billing', href: '#', icon: CreditCardIcon, current: false }
]

const store = useAppStore()

const currentItem = ref('General')
const { loading, profile } = storeToRefs(store)

const setItem = (item: string) => {
  currentItem.value = item
}

const isActive = (item: string) => {
  return currentItem.value == item
}
</script>
