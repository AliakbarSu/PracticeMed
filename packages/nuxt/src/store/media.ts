import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchVideosApi } from "../api/mediaApi";
import { type Video } from "../types/video";

export const useMediaStore = defineStore("media", () => {
  const media = ref<Video[]>([]);
  const loading = ref(false);
  const $reset = () => {
    loading.value = false;
  };

  const fetchMedia = async () => {
    try {
      loading.value = true;
      const result = (await fetchVideosApi()) as any;
      media.value = result || [];
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    $reset,
    fetchMedia,
    media,
    loading,
  };
});
