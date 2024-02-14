<template>
  <div class="bg-white px-16 py-10">
    <div class="mx-auto text-base leading-7 text-gray-700">
      <div class="overflow-hidden rounded-lg bg-white shadow">
        <div class="px-4 py-5 sm:p-6">
          <h1
            class="mt-6 text-2xl leading-5 sm:leading-8"
            v-html="question?.text"
          ></h1>
        </div>
      </div>
    </div>
    <div>
      <h2 class="mt-8 text-md font-medium text-gray-500">Options</h2>
      <ul class="mt-3 flex justify-between flex-wrap gap-2" role="list">
        <li
          v-for="option in question.options"
          :key="option.alpha"
          class="w-[48%] flex rounded-md shadow-sm"
        >
          <div
            :class="[
              colors[option.alpha.toLowerCase()],
              'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-xl font-medium text-white',
            ]"
          >
            <b>{{ option.alpha }}</b>
          </div>
          <div
            class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
          >
            <div class="flex-1 truncate px-4 py-2 text-xl">
              <p class="text-gray-500 font-bold">{{ option.text }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--    <div class="w-full py-2 mt-4">-->
    <!--      <div class="text-center">-->
    <!--        <p class="uppercase mx-auto text-md tracking-tight text-gray-900">-->
    <!--          Provided By Practice Med-->
    <!--        </p>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts" setup>
import { type Question } from "../../src/types/question";

const colors = {
  a: "bg-indigo-600",
  b: "bg-green-600",
  c: "bg-yellow-600",
  d: "bg-pink-600",
};

withDefaults(
  defineProps<{
    question?: Question;
  }>(),
  {
    question: null,
  },
);
</script>
