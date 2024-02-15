<template>
  <div class="bg-white py-2 px-2 md:px-16 md:py-10">
    <div v-for="question in questions" :key="question._id" class="mb-5">
      <div class="mx-auto text-base leading-7 text-gray-700">
        <div class="overflow-hidden rounded-lg bg-white shadow">
          <div class="px-4 py-5 sm:p-6">
            <Badge v-if="(question as any).demo" value="Demo"></Badge>
            <h1
              class="mt-6 text-md-body-1 md:text-2xl leading-5 sm:leading-8"
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
            class="w-full md:w-[48%] flex flex-wrap md:flex-nowrap rounded-md shadow-sm"
          >
            <div
              :class="[
                colors[
                  (option as any).is_correct ? 'e' : option.alpha.toLowerCase()
                ],
                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-md-body-1 md:text-xl font-medium text-white',
              ]"
            >
              <b>{{ option.alpha }}</b>
            </div>
            <div
              class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
            >
              <div class="flex-1 truncate px-4 py-2 text-md-body-1 md:text-xl">
                <p class="text-gray-500 font-bold">{{ option.text }}</p>
              </div>
            </div>
          </li>
        </ul>
        <div class="py-4 px-2">
          <p class="text-sm">
            {{ (question as any).correct_option.explanation }}
          </p>
        </div>
      </div>
      <!--    <div class="w-full py-2 mt-4">-->
      <!--      <div class="text-center">-->
      <!--        <p class="uppercase mx-auto text-md tracking-tight text-gray-900">-->
      <!--          Provided By Practice Med-->
      <!--        </p>-->
      <!--      </div>-->
      <!--    </div>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Question } from "../../src/types/question";

const colors = {
  a: "bg-indigo-600",
  b: "bg-purple-600",
  c: "bg-yellow-600",
  d: "bg-pink-600",
  e: "bg-green-600",
};

withDefaults(
  defineProps<{
    questions?: Question[];
  }>(),
  {
    questions: [] as any,
  },
);
</script>
