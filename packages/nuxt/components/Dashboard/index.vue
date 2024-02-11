<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-8 lg:px-8">
      <div class="max-w-2xl pb-12">
        <p class="mt-2 text-lg leading-8 text-gray-600">
          Track your progress by reviewing previous tests or take a new one.
        </p>
      </div>
      <TabView>
        <TabPanel header="Available Tests">
          <DashboardComponentsUILoadingSkeleton v-if="loading" />
          <div
            v-if="!loading"
            :class="{
              'lg:grid-cols-1': (previousTests as TestType[])?.length <= 0,
            }"
            class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            <DashboardComponentsTest
              v-for="test in tests as TestType[]"
              :key="test.id"
              :test="test"
            />
          </div>
        </TabPanel>
        <TabPanel header="Previous Tests">
          <DashboardComponentsUILoadingSkeleton v-if="loading" />
          <div
            v-if="!loading"
            :class="{
              'lg:grid-cols-1': (previousTests as TestType[]).length <= 0,
            }"
            class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            <DashboardComponentsUICTANoTestHistory
              v-if="(previousTests as TestType[]).length <= 0"
            />

            <DashboardComponentsTestHistory
              v-for="test in previousTests"
              :key="(test as TestType).id"
              :test="test"
            />
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

import type { Test as TestType } from "../../src/types/test";
import { useAppStore } from "../../src/store/main";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import * as Gtag from "../../src/gtag/index";
import { usePlansStore } from "../../src/store/plans";
import { useAuthStore } from "../../src/store/auth";
import { useUIStore } from "../../src/store/UI";

const route = useRoute();
const appStore = useAppStore();
const plansStore = usePlansStore();
const authStore = useAuthStore();
const UIStore = useUIStore();

const { plans } = storeToRefs(plansStore);

const { tests } = storeToRefs(appStore);

const testsHistory = computed(() => appStore.profile?.results);

const previousTests = computed(() =>
  testsHistory.value
    ?.map((testHistory) => {
      const test = tests.value.find(({ id }) => testHistory.test_id == id);
      return test
        ? {
            ...test,
            ...testHistory,
            id: testHistory.id,
          }
        : null;
    })
    .filter((test) => test),
);

watch(plans, () => {
  const success = !!route.query.success || false;
  const planId = route.query.id || null;
  const freeTrial = route.query.free_trial || false;
  if (success && planId) {
    const plan = plans.value.find(({ id }) => id === planId);
    if (!plan) return;
    if (freeTrial) {
      Gtag.purchase(plan, true);
    } else {
      Gtag.purchase(plan);
    }
  }
});

const loading = computed(() => UIStore.tests.loading);

watch(
  [
    () => authStore.isAuthenticated,
    () => appStore.tests,
    () => appStore.loading,
  ],
  ([isAuth, tests, loading]) => {
    if (isAuth && tests.length <= 0 && !loading) {
      appStore.fetchTests();
    }
  },
  { immediate: true },
);

useSeoMeta({
  title: "Dashboard",
  description:
    "Track your progress by reviewing previous tests or take a new one.",
});
</script>

<style scoped>
div[id^="headlessui-menu-items"] {
  left: 0 !important;
}
</style>
