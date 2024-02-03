<template>
  <NuxtLayout>
    <UIAlertsError v-if="UIStore.error" />
    <UILoading />
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts" setup>
import { useUIStore } from "./src/store/UI";
import { useAuthStore } from "./src/store/auth";
import { useAppStore } from "./src/store/main";
import { usePlansStore } from "./src/store/plans"; // import { buildAuthClient, getAuthToken } from "./src/auth/index";

const UIStore = useUIStore();
const store = useAppStore();
const authStore = useAuthStore();
const plansStore = usePlansStore();

const {
  public: { cdn_url },
} = useRuntimeConfig();

useHead({
  link: [
    {
      href: cdn_url + "/assets/favicons/apple-icon-57x57.png",
      rel: "apple-touch-icon",
      sizes: "57x57",
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: cdn_url + "/assets/favicons/apple-icon-60x60.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "72x72",
      href: cdn_url + "/assets/favicons/apple-icon-72x72.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "76x76",
      href: cdn_url + "/assets/favicons/apple-icon-76x76.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      href: cdn_url + "/assets/favicons/apple-icon-114x114.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      href: cdn_url + "/assets/favicons/apple-icon-120x120.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      href: cdn_url + "/assets/favicons/apple-icon-144x144.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      href: cdn_url + "/assets/favicons/apple-icon-152x152.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: cdn_url + "/assets/favicons/apple-icon-180x180.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: cdn_url + "/assets/favicons/android-icon-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: cdn_url + "/assets/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      href: cdn_url + "/assets/favicons/favicon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: cdn_url + "/assets/favicons/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: cdn_url + "/assets/favicons/manifest.json",
    },
  ],
  meta: [
    {
      name: "msapplication-TileImage",
      content: cdn_url + "/assets/favicons/ms-icon-144x144.png",
    },
  ],
});

watch(
  () => authStore.isAuthenticated,
  (isAuth) => {
    if (isAuth) {
      store.fetchProfileData();
      store.fetchPortalLink();
      store.fetchTests();
      store.fetchTestsHistory();
      plansStore.fetchPlans();
    }
  },
  { immediate: true },
);
</script>
