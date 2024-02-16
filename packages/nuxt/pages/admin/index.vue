<template>
  <div class="card mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
    <TabMenu v-model:activeIndex="active" :model="items" class="w-full" />
    <div
      class="p-5 border-gray-200 border-solid border-2 rounded mt-2 w-[99%] mx-auto"
    >
      <div v-if="active == 0">
        <NuxtLink to="/admin/users">View users</NuxtLink>
      </div>
      <div v-if="active == 1" class="flex flex-wrap">
        <NuxtLink as="a" class="w-full p-2" to="/admin/questions"
          >View questions
        </NuxtLink>
        <NuxtLink as="a" class="w-full p-2" to="/admin/questions/add"
          >Add Question
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth-client"] });

const active = ref(0);

const items = ref([
  { label: "Users", icon: "pi pi-home" },
  { label: "Questions", icon: "pi pi-chart-line" },
]);
</script>
