export const fetchVideosApi = async () => {
  const response = await useFetch<{ body: [] }>(`/api/videos`, {
    method: "GET",
  });
  return response.data.value;
};
