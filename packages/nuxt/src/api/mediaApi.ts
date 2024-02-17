import { useAuthStore } from "store/auth";

export const fetchVideosApi = async () => {
  const response = await useFetch<{ body: [] }>(`/api/videos`, {
    method: "GET",
  });
  return response.data.value;
};

export const fetchVideoPresignedUrlApi = async (key: string) => {
  const {
    public: { api_endpoint },
  } = useRuntimeConfig();
  const authStore = useAuthStore();
  const response = await useFetch<{ body: string }>(
    `${api_endpoint}/paid-media/videos/${key}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${authStore.token}` },
    },
  );
  return response.data.value?.body;
};
