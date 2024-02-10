import type { Plan } from "@/types/plans";
import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAppStore } from "./main";
import { useUIStore } from "./UI";
import { useAuthStore } from "./auth";

export const usePlansStore = defineStore("plans", () => {
  const appStore = useAppStore();
  const authStore = useAuthStore();
  const UIStore = useUIStore();

  const loading = ref(false);
  const plans = ref<Plan[]>([{} as Plan, {} as Plan, {} as Plan]);
  const checkoutUrl = ref<string | null>(null);

  const userActivePlan = computed(
    () =>
      appStore.profile?.plan &&
      plans.value.find((plan) => plan.id === appStore.profile?.plan.id),
  );
  const userHasActivePlan = computed(() => !!userActivePlan.value);

  const $reset = () => {
    plans.value = [];
    loading.value = false;
    checkoutUrl.value = null;
  };

  const fetchPlans = async () => {
    try {
      loading.value = true;
      const result = await useFetch<Plan[]>(`/api/plans`, {
        method: "GET",
      });
      plans.value = result.data.value || [];
    } catch (err) {
      UIStore.error = err as Error;
    } finally {
      loading.value = false;
    }
  };

  const subscribe = async (plan: Plan) => {
    const {
      public: { api_endpoint },
    } = useRuntimeConfig();
    try {
      const url = `${api_endpoint}/plans/${plan.id}/subscribe`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      checkoutUrl.value = result.data.body;
    } catch (err) {
      UIStore.error = err as Error;
    }
  };

  const subscribeToFreeTrial = async (plan: Plan) => {
    const {
      public: { api_endpoint },
    } = useRuntimeConfig();
    try {
      const url = `${api_endpoint}/plans/${plan.id}/subscribe/free-trial`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      checkoutUrl.value = result.data.body;
    } catch (err) {
      UIStore.error = err as Error;
    }
  };

  return {
    fetchPlans,
    subscribe,
    subscribeToFreeTrial,
    plans,
    loading,
    userHasActivePlan,
    userActivePlan,
    $reset,
    checkoutUrl,
  };
});
