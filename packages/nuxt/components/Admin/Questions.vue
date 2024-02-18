<template>
  <div class="bg-white py-2 px-2 md:px-16 md:py-10">
    <div
      class="mb-16 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0"
    >
      <div v-for="item in stats" :key="item.name" class="px-4 py-5 sm:p-6">
        <dt class="text-base font-normal text-gray-900">
          {{ item.name }}
        </dt>
        <ResultsComponentsUILoadingContentSkeleton v-if="loading" />
        <dd
          v-if="!loading"
          class="mt-1 flex items-baseline justify-between md:block lg:flex"
        >
          <div
            class="flex items-baseline text-2xl font-semibold text-indigo-600"
          >
            {{ item.stat }}
            <span class="ml-2 text-sm font-medium text-gray-500"
              >from {{ item.previousStat }}</span
            >
          </div>

          <div
            :class="[
              item.changeType === 'increase'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800',
              'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0',
            ]"
          >
            <ArrowUpIcon
              v-if="item.changeType === 'increase'"
              aria-hidden="true"
              class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
            />
            <ArrowDownIcon
              v-else
              aria-hidden="true"
              class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
            />
            <span class="sr-only">
              {{ item.changeType === "increase" ? "Increased" : "Decreased" }}
              by
            </span>
            {{ item.change }}
          </div>
        </dd>
      </div>
    </div>
    <div v-for="question in questions" :key="question._id" class="mb-5">
      <div class="mx-auto text-base leading-7 text-gray-700">
        <div class="overflow-hidden rounded-lg bg-white shadow">
          <div class="px-4 py-5 sm:p-6">
            <p class="py-3">
              ID:
              <b class="cursor-pointer" @click="copyText(question._id)">{{
                question._id
              }}</b>
            </p>
            <div class="flex gap-2">
              <Badge v-if="(question as any).demo" value="Demo"></Badge>
              <Badge
                v-if="(question as any).available"
                severity="info"
                value="Active"
              ></Badge>
            </div>
            <h1
              class="mt-6 text-md-body-1 md:text-2xl leading-5 sm:leading-8"
              v-html="question?.text"
            ></h1>
            <div class="flex gap-2 mt-4">
              <button
                :disabled="loading"
                class="bg-red-600 text-white py-1 px-3 rounded-md text-sm"
                type="button"
                @click="deleteQuestion(question._id)"
              >
                Delete
              </button>
              <button
                v-if="question.available"
                :disabled="loading"
                class="bg-red-600 text-white py-1 px-3 rounded-md text-sm"
                type="button"
                @click="deactivate(question._id)"
              >
                Deactivate
              </button>
              <button
                v-if="!question.available"
                :disabled="loading"
                class="bg-red-600 text-white py-1 px-3 rounded-md text-sm"
                type="button"
                @click="activate(question._id)"
              >
                Activate
              </button>
              <button
                v-if="!question.demo"
                :disabled="loading"
                class="bg-red-600 text-white py-1 px-3 rounded-md text-sm"
                type="button"
                @click="markAsDemo(question._id)"
              >
                Mark as demo
              </button>
              <button
                v-if="question.demo"
                :disabled="loading"
                class="bg-red-600 text-white py-1 px-3 rounded-md text-sm"
                type="button"
                @click="unmarkAsDemo(question._id)"
              >
                Unmark as demo
              </button>
              <NuxtLink
                :to="`/admin/questions/update/${question._id}`"
                as="a"
                class="bg-yellow-600 text-white py-1 px-3 rounded-md text-sm"
                >Update
              </NuxtLink>
            </div>
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
import { type QuestionObject } from "types/question";
import { useAdminStore } from "store/admin";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/vue/20/solid";

const adminStore = useAdminStore();
const copyText = useCopyText();
const loading = computed(() => adminStore.loading);

const colors = {
  a: "bg-indigo-600",
  b: "bg-purple-600",
  c: "bg-yellow-600",
  d: "bg-pink-600",
  e: "bg-green-600",
};

const props = withDefaults(
  defineProps<{
    questions?: QuestionObject[];
  }>(),
  {
    questions: [] as any,
  },
);

const stats = [
  {
    name: "Total Questions",
    stat: props.questions.length,
    previousStat: props.questions.length,
    change: "0",
    changeType: "increase",
  },
  {
    name: "Active Questions",
    stat: props.questions.filter((q) => q.available).length,
    previousStat: props.questions.length,
    change: "0",
    changeType: "increase",
  },
  {
    name: "Demo Questions",
    stat: props.questions.filter((q) => q.demo).length,
    previousStat: props.questions.filter((q) => q.available).length,
    change: "0",
    changeType: "increase",
  },
];

const deleteQuestion = (id: string) => {
  adminStore.deleteQuestion(id);
};

const deactivate = (id: string) => {
  adminStore.updateQuestions({ id: id, available: false } as QuestionObject);
};

const activate = (id: string) => {
  adminStore.updateQuestions({ id: id, available: true } as QuestionObject);
};

const markAsDemo = (id: string) => {
  adminStore.updateQuestions({ id: id, demo: true } as QuestionObject);
};

const unmarkAsDemo = (id: string) => {
  adminStore.updateQuestions({ id: id, demo: false } as QuestionObject);
};
</script>
