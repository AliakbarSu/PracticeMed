import type { Test } from "@/types/test";
import type { Results } from "@/types/results";
import { type Profile, type RolesEnum } from "@/types/user";
import { defineStore } from "pinia";
import { useUIStore } from "./UI";
import { ref } from "vue";
import { loadPortalLink, loadProfileData, loadTests } from "../api/profileApi";

export const useAppStore = defineStore("app", () => {
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const profile = ref<Profile | null>(null);
  const portalLink = ref<string | null>(null);
  const portalLinkExpiresIn = ref<number | null>(null);
  const results = ref<Results[]>([]);
  const tests = ref<Test[]>([]);
  const UIStore = useUIStore();

  function $reset() {
    profile.value = null;
    results.value = [];
    portalLink.value = null;
  }

  const canTryMockTest = computed(
    () => !profile?.value?.results?.some((test) => test.id == "jj"),
  );

  const isAdmin = computed(() =>
    profile.value?.roles.includes("admin" as RolesEnum),
  );

  const fetchProfileData = async () => {
    try {
      loading.value = true;
      const result = await loadProfileData();
      profile.value = {
        ...result,
        results: [...(profile?.value?.results || []), ...result.results],
      };
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  const fetchTests = async () => {
    try {
      loading.value = true;
      UIStore.startLoadingTests();
      tests.value = await loadTests();
      UIStore.testsLoaded();
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
      UIStore.stopLoadingTests();
    }
  };

  const fetchPortalLink = async () => {
    try {
      loading.value = true;
      portalLink.value = await loadPortalLink();
      portalLinkExpiresIn.value = Date.now() + 1000 * 60 * 30;
    } finally {
      loading.value = false;
    }
  };

  watch(portalLinkExpiresIn, async (expiresIn) => {
    if (expiresIn && Date.now() > expiresIn) {
      await fetchPortalLink();
    }
  });

  return {
    fetchProfileData,
    fetchTests,
    fetchPortalLink,
    portalLinkExpiresIn,
    tests,
    profile,
    loading,
    error,
    $reset,
    portalLink,
    canTryMockTest,
    isAdmin,
  };
});
