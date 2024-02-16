import type { SubmittedAnswer, Test } from "@/types/test";
import type { Question, QuestionObject } from "../types/question";
import { defineStore } from "pinia";
import { ref } from "vue";
import {
  addQuestionApi,
  deleteQuestionApi,
  fetchQuestionsApi,
  fetchUsersApi,
  updateQuestionApi,
} from "../api/adminApi";
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

  const addQuestion = async (question: QuestionObject) => {
    try {
      loading.value = true;
      const addedQuestion = (await addQuestionApi(question)) as Question;
      questions.value = [...questions.value, addedQuestion];
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  const updateQuestions = async (question: QuestionObject) => {
    try {
      loading.value = true;
      const updatedQuestion = (await updateQuestionApi(question)) as Question;
      questions.value = questions.value.map((q) =>
        q._id === updatedQuestion._id ? updatedQuestion : q,
      );
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  const deleteQuestion = async (id: string) => {
    try {
      loading.value = true;
      const questionId = (await deleteQuestionApi(id)) as string;
      questions.value = questions.value.filter((q) => q._id !== questionId);
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
    deleteQuestion,
    updateQuestions,
    addQuestion,
    reSubmit,
    $reset,
    questions,
    users,
    loading,
    error,
  };
});
