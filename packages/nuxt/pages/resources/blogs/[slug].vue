<template>
  <div class="bg-white px-6 py-32 lg:px-8">
    <Head>
      <Title>{{ data.title }}</Title>
      <Meta :content="data.thumbnail[0]?.url" property="og:image" />
      <Meta :content="data.title" property="og:description" />
      <Meta content="article" property="og:type" />
    </Head>
    <div
      v-if="!pending"
      class="mx-auto max-w-3xl text-base leading-7 text-gray-700"
    >
      <p class="text-base font-semibold leading-7 text-indigo-600">
        {{ data.subtitle }}
      </p>
      <h1
        class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        {{ data.title }}
      </h1>
      <div v-if="data.thumbnail?.length" class="py-10">
        <img :src="data.thumbnail[0].url" />
      </div>
      <div class="blog-content" v-html="data.body.html"></div>
      <figure class="hidden mt-16">
        <img
          alt=""
          class="aspect-video rounded-xl bg-gray-50 object-cover"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
        />
        <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
          <InformationCircleIcon
            aria-hidden="true"
            class="mt-0.5 h-5 w-5 flex-none text-gray-300"
          />
          Faucibus commodo massa rhoncus, volutpat.
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { data, pending, error, refresh } = (await useFetch(
  `/api/blogs/${route.params.slug}`,
)) as any;

useSeoMeta({
  title: () =>
    "Resource about how to prepare and pass your AMC MCQ exam | Practice Med",
  description: () =>
    "Resrouces to prepare for your medical licensing exam including AMC MCQ",
});
</script>

<style>
.blog-content ul {
  list-style: circle;
  width: 94%;
  margin: auto;
}

.blog-content ul li {
  padding-top: 18px;
}
</style>
