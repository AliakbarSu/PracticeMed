<template>
  <!-- Profile dropdown -->
  <Menu as="div" class="relative ml-3">
    <div>
      <MenuButton
        class="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span class="sr-only">Open user menu</span>
        <img
          :class="{ 'border-2 border-red-500': isAdmin }"
          :src="(user as any)?.picture"
          alt=""
          class="h-8 w-8 rounded-full"
        />
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem v-slot="{ active }">
          <NuxtLink
            :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-sm text-gray-700',
            ]"
            to="/account"
            >Settings
          </NuxtLink>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <a
            :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-sm text-gray-700',
            ]"
            href="#"
            @click="logoutFromApp"
            >Sign out</a
          >
        </MenuItem>
        <MenuItem v-if="isAdmin" v-slot="{ active }">
          <NuxtLink
            :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-sm text-gray-700',
            ]"
            as="a"
            to="/admin"
            >Admin Panel
          </NuxtLink>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../../src/store/auth";
import { useAppStore } from "../../../../src/store/main";
import { logout } from "../../../../src/auth/index";

const router = useRouter();
const authStore = useAuthStore();
const appStore = useAppStore();

const user = computed(() => authStore.user);
const isAdmin = computed(() => appStore.isAdmin);

const logoutFromApp = async () => {
  await logout();
};
const goTo = (link: string) => {
  router.push(link);
};
</script>
