import type { SubmittedAnswer, Test } from "@/types/test";
import type { Question } from "../types/question";
import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchQuestionsApi, fetchUsersApi } from "../api/adminApi";
import { submitTestApi } from "../api/testApi";
import { useAppStore } from "./main";

export const useAdminStore = defineStore("admin", () => {
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const users = ref<any[]>([]);
  const tests = ref<Test[]>([]);
  const questions = ref<Question[]>([]);
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

  const fetchQuestions = async () => {
    try {
      loading.value = true;
      questions.value = (await fetchQuestionsApi()) as any[];
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
    fetchQuestions,
    reSubmit,
    $reset,
    questions,
    users,
    loading,
    error,
  };
});
