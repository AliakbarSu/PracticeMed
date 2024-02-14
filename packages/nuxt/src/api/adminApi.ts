import { useAuthStore } from "../store/auth";

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

export const fetchOgImage = async () => {
  const route = useRoute();
  const response = await useFetch(`/api/screenshot?id=${route.params.id}`, {
    method: "GET",
  });
  return response.data.value;
};
