import { useAuthStore } from "../store/auth";
import type { QuestionObject } from "../types/question";

export const fetchUsersApi = async () => {
  const {
    public: { api_endpoint },
  } = useRuntimeConfig();
  const authStore = useAuthStore();
  const response = await useFetch<{ body: [] }>(`${api_endpoint}/admin/users`, {
    method: "GET",
    headers: { Authorization: `Bearer ${authStore.token}` },
  });
  return response.data.value?.body;
};

export const fetchQuestionsApi = async () => {
  const {
    public: { api_endpoint },
  } = useRuntimeConfig();
  const authStore = useAuthStore();
  const response = await useFetch<{ body: [] }>(
    `${api_endpoint}/admin/questions`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${authStore.token}` },
    },
  );
  return response.data.value?.body;
};

export const fetchPublicQuestionApi = async () => {
  const {
    public: { api_endpoint },
  } = useRuntimeConfig();
  const route = useRoute();
  const response = await useFetch<{ body: any }>(
    `${api_endpoint}/questions/${route.params.id}`,
    {
      method: "GET",
    },
  );
  return response.data.value?.body;
};

export const addQuestionApi = async (question: QuestionObject) => {
  const {
    public: { api_endpoint },
  } = useRuntimeConfig();
  const authStore = useAuthStore();
  const response = await useFetch<{ body: any }>(
    `${api_endpoint}/admin/add-question`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: question,
    },
  );
  return response.data.value?.body;
};

export const updateQuestionApi = async (question: QuestionObject) => {
  const {
    public: { api_endpoint },
  } = useRuntimeConfig();
  const authStore = useAuthStore();
  const response = await useFetch<{ body: any }>(
    `${api_endpoint}/admin/update-question`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: question,
    },
  );
  return response.data.value?.body;
};

export const deleteQuestionApi = async (id: string) => {
  const {
    public: { api_endpoint },
  } = useRuntimeConfig();
  const authStore = useAuthStore();
  const response = await useFetch<{ body: any }>(
    `${api_endpoint}/admin/delete-question/${id}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${authStore.token}` },
    },
  );
  return response.data.value?.body;
};

export const fetchOgImage = async () => {
  const route = useRoute();
  const response = await useFetch(`/api/screenshot?id=${route.params.id}`, {
    method: "GET",
  });
  return response.data.value;
};
