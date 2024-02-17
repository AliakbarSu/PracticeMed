import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchVideoPresignedUrlApi, fetchVideosApi } from "../api/mediaApi";
import { type Video } from "types/video";

export const useMediaStore = defineStore("media", () => {
  const media = ref<Video[]>([]);
  const loading = ref(false);
  const videoPresignedUrl = ref<string | null>(null);
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

  const fetchVideoPresignedUrl = async (key: string) => {
    try {
      loading.value = true;
      videoPresignedUrl.value = (await fetchVideoPresignedUrlApi(key)) as any;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    $reset,
    fetchMedia,
    fetchVideoPresignedUrl,
    media,
    videoPresignedUrl,
    loading,
  };
});
