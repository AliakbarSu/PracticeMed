<template>
  <div class="bg-white px-6 py-32 lg:px-8">
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
      <div v-html="data.body.html"></div>
      <figure class="hidden mt-16">
        <img
          class="aspect-video rounded-xl bg-gray-50 object-cover"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
          alt=""
        />
        <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
          <InformationCircleIcon
            class="mt-0.5 h-5 w-5 flex-none text-gray-300"
            aria-hidden="true"
          />
          Faucibus commodo massa rhoncus, volutpat.
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data, pending, error, refresh } = await useFetch(
  `/api/blogs/${route.params.slug}`
)
</script>
