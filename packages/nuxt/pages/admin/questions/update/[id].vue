<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <AdminAddQuestion
        :question="question as QuestionObject"
        :update-mode="true"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAdminStore } from "store/admin";
import { type QuestionObject } from "types/question";

const adminStore = useAdminStore();
const route = useRoute();
const id = route.params.id;
const question = computed(() => adminStore.questions.find((q) => q._id == id));
</script>
