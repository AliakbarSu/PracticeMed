<template>
  <div class="bg-white p-16">
    <Menubar :model="items" class="w-full flex">
      <template #item="{ item }">
        <div class="flex gap-3 flex-wrap">
          <NuxtLink :to="item.url" class="w-full">{{ item.label }}</NuxtLink>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth-client"] });

const items = ref([
  {
    label: "Users",
    icon: "pi pi-home",
    url: "/admin/users",
  },
  {
    label: "Questions",
    icon: "pi pi-star",
    url: "/admin/questions",
  },
]);
</script>
