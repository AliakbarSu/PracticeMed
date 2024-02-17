<template>
  <div class="flex justify-center">
    <ProgressSpinner v-if="loading" />
    <Message v-if="!loading && !videoUrl" :closable="false" severity="error"
      >Sorry something went wrong! Please go back and try again
    </Message>
    <div v-if="!loading && videoUrl">
      <video
        class="w-full h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
        controls
      >
        <source :src="videoUrl" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="py-16 flex flex-col gap-5">
        <h1 class="text-2xl font-bold">{{ props.video?.title }}</h1>
        <p class="text-gray-600">{{ props.video?.description }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type Video } from "types/video";
import { useMediaStore } from "store/media";

const mediaStore = useMediaStore();

const props = defineProps<{
  video?: Video;
}>();

const loading = computed(() => mediaStore.loading);
const videoUrl = computed(() => mediaStore.videoPresignedUrl);
</script>
