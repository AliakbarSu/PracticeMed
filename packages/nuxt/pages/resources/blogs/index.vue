<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Resources
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600 mb-6">
          Learn how to pass your medical licensing exam with our great
          resources.
        </p>
        <ResourcesTabs :tabs="tabs" @switchTab="setActiveTab" />
        <div
          v-if="!pending && isActiveTab('Blogs')"
          class="mt-10 space-y-16 sm:mt-16"
        >
          <article
            v-for="post in data"
            :key="post.id"
            class="flex max-w-xl flex-col items-start justify-between"
          >
            <div class="flex items-center gap-x-4 text-xs">
              <time :datetime="post.publishedOn" class="text-gray-500"
                >{{
                  new Date(post.publishedOn).toLocaleDateString("en-CA", {
                    month: "long",
                    year: "numeric",
                    day: "numeric",
                  })
                }}
              </time>
              <NuxtLink
                :href="`/resources/blogs/${post.slug}`"
                as="as"
                class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >{{ post.topic }}
              </NuxtLink>
            </div>
            <div class="group relative">
              <h3
                class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
              >
                <a :href="`/resources/blogs/${post.slug}`">
                  <span class="absolute inset-0" />
                  {{ post.title }}
                </a>
              </h3>
              <div
                class="line-clamp-3 text-sm leading-6 text-gray-600"
                v-html="post.body.html"
              ></div>
            </div>
            <div class="hidden relative mt-8 items-center gap-x-4">
              <!-- <img
                :src="post.author.imageUrl"
                alt=""
                class="h-10 w-10 rounded-full bg-gray-50"
              /> -->
              <!-- <div class="text-sm leading-6">
                <p class="font-semibold text-gray-900">
                  <a :href="post.author.href">
                    <span class="absolute inset-0" />
                    {{ post.author.name }}
                  </a>
                </p>
                <p class="text-gray-600">{{ post.author.role }}</p>
              </div> -->
            </div>
          </article>
        </div>
        <div v-if="!pending && isActiveTab('videos')">
          <ResourcesVideos />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMediaStore } from "../../../src/store/media";

const mediaStore = useMediaStore();

await mediaStore.fetchMedia();

const { data, pending } = await useFetch(`/api/blogs`);

useSeoMeta({
  title:
    "Resource about how to prepare and pass your AMC MCQ exam | Practice Med",
  description:
    "Resrouces to prepare for your medical licensing exam including AMC MCQ",
  ogTitle: "PracticeMed - Blogs - Resources about AMC mcq exam",
  ogDescription: "Providing amc mcq mock tests with detailed feedback.",
  ogImage:
    "https://res.cloudinary.com/dxuf2ssx6/image/upload/c_scale,w_1200/v1682630656/practiceMed/Illustrations/hero_image.png",
  ogUrl: "https://practicemed.org",
  ogType: "website",
});

const tabs = ref([
  {
    name: "Blogs",
    current: true,
  },
  {
    name: "Videos",
    current: false,
  },
]);

const isActiveTab = (tab: string) => {
  return tabs.value.find((t) => t.name.toLowerCase() == tab.toLowerCase())
    ?.current;
};

const setActiveTab = (tab: string) => {
  tabs.value = tabs.value.map((t) => ({
    ...t,
    current: t.name === tab,
  }));
};
</script>
