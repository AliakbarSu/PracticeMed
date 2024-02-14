<template>
  <div class="min-h-screen">
    <OgImageQuestion :question="question" />
  </div>
</template>

<script lang="ts" setup>
import { type Question } from "../../src/types/question";
import { fetchPublicQuestionApi } from "../../src/api/adminApi";

useSeoMeta({
  title: "PracticeMed Question",
  description: "AMC daily mock questions",
});

const route = useRoute();

const question: Question = await fetchPublicQuestionApi();
const id = route.params.id;

useSeoMeta({
  ogTitle: "PracticeMed Question",
  ogImage: `https://res.cloudinary.com/dxuf2ssx6/image/upload/v1707947397/practiceMed/questions/${id}.jpg`,
});
</script>
