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

const question: Question = await fetchPublicQuestionApi();
</script>
