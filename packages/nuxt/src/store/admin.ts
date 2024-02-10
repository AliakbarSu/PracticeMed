import type { SubmittedAnswer, Test } from "@/types/test";
import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchUsersApi } from "../api/adminApi";
import { submitTestApi } from "../api/testApi";
import { useAppStore } from "./main";

export const useAdminStore = defineStore("admin", () => {
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const users = ref<any[]>([]);
  const tests = ref<Test[]>([]);
  const appStore = useAppStore();

  const $reset = () => {
    users.value = [];
    tests.value = [];
  };

  const fetchUsers = async () => {
    try {
      loading.value = true;
      users.value = (await fetchUsersApi()) as any[];
      if (appStore.profile?.results) {
        appStore.profile.results = [
          ...(appStore?.profile?.results || []),
          ...users.value.map((user) => user.results).flat(),
        ];
      }
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  const reSubmit = async (test: SubmittedAnswer & { user_id: string }) => {
    try {
      loading.value = true;
      await submitTestApi(test.test_id, test);
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchUsers,
    users,
    loading,
    error,
    reSubmit,
    $reset,
  };
});
