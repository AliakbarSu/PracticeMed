<template>
  <div class="bg-white py-24 sm:py-32 min-h-fit flex items-center">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <ResourcesVideoPlayer :video="video" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMediaStore } from "store/media";

const route = useRoute();
const mediaStore = useMediaStore();
const id = route.params.id;

const videos = computed(() => mediaStore.media);

const video = videos.value.find((video) => video.id == id);
const key = video?.objectKey;
if (key) {
  await mediaStore.fetchVideoPresignedUrl(key);
}
</script>
