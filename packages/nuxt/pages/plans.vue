<template>
  <button @click="navigate">navigate</button>
  <Plans />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["fetch-plans"],
});

const router = useRouter();

useSeoMeta({
  title: "AMC MCQ mock tests | Practice Med",
  description:
    "Practice Med provides mock tests for the popular medical licensing exams such as AMC MCQ",
});

const navigate = () => {
  router.push("/dashboard");
};
</script>
