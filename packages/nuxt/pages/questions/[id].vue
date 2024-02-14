<template>
  <div class="min-h-screen">
    <OgImageQuestion :question="question" />
  </div>
</template>

<script lang="ts" setup>
import { type Question } from "../../src/types/question";
import { fetchOgImage, fetchPublicQuestionApi } from "../../src/api/adminApi";

useSeoMeta({
  title: "PracticeMed Question",
  description: "AMC daily mock questions",
});

const question: Question = await fetchPublicQuestionApi();
const image = await fetchOgImage();

useSeoMeta({
  ogTitle: "PracticeMed Question",
  ogImage: image?.url,
});
</script>
