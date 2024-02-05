<template>
  <Plans />
</template>

<script lang="ts" setup>
import { usePlansStore } from "../src/store/plans";

definePageMeta({
  // middleware: ["fetch-plans"],
});

const plans = usePlansStore();
await plans.fetchPlans();

useSeoMeta({
  title: "AMC MCQ mock tests | Practice Med",
  description:
    "Practice Med provides mock tests for the popular medical licensing exams such as AMC MCQ",
  ogTitle: "PracticeMed - Plans - AMC mock tests",
  ogDescription: "Providing amc mcq mock tests with detailed feedback.",
  ogImage:
    "https://res.cloudinary.com/dxuf2ssx6/image/upload/c_scale,w_1200/v1682630656/practiceMed/Illustrations/hero_image.png",
  ogUrl: "https://practicemed.org",
  ogType: "website",
});
</script>
