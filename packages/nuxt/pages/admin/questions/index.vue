<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <AdminQuestions :questions="questions as QuestionObject[]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAdminStore } from "store/admin";
import { type QuestionObject } from "types/question";

const adminStore = useAdminStore();

const questions = computed(() => adminStore.questions);

if (questions.value.length == 0) {
  await adminStore.fetchQuestions();
}
definePageMeta({ middleware: ["auth-client"] });
</script>
