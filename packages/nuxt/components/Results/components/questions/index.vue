<template>
  <Accordion :active-index="0" class="flow-root p-4 md:p-12">
    <AccordionTab header="Questions">
      <ul class="mt-2" role="list">
        <li v-for="(event, eventIdx) in updatedQuestions" :key="eventIdx">
          <div class="relative pb-8">
            <div class="relative flex space-x-3">
              <div>
                <span
                  :class="[
                    event.iconBackground,
                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                  ]"
                >
                  <component
                    :is="event.icon"
                    aria-hidden="true"
                    class="h-5 w-5 text-white"
                  />
                </span>
              </div>
              <div class="min-w-0 flex-1 justify-between space-y-4 pt-1.5">
                <div>
                  <p class="text-sm text-gray-500">
                    {{ event.question }}
                  </p>
                </div>
                <div class="relative">
                  <div
                    aria-hidden="true"
                    class="absolute inset-0 flex items-center"
                  >
                    <div class="w-[95%] border-t border-gray-300" />
                  </div>
                  <div class="relative flex justify-start">
                    <span class="bg-white pr-2 text-sm text-gray-500"
                      >Options</span
                    >
                  </div>
                </div>
                <div>
                  <div
                    class="flex flex-wrap whitespace-nowrap text-sm text-gray-500"
                  >
                    <div
                      v-for="option in event.options"
                      :key="option.id"
                      :class="['flex py-3 px-2 pr-3']"
                    >
                      <Tag
                        :severity="getStatus(event, option)"
                        :value="option.alpha.toUpperCase()"
                      ></Tag>
                      <span
                        class="flex align-items whitespace-break-spaces ml-2 font-medium"
                        >{{ option.option }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </AccordionTab>
  </Accordion>
</template>

<script lang="ts" setup>
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/vue/20/solid";
import { type QuestionHistory } from "../../../../src/types/results";

const statuses = {
  correct: "success",
  incorrect: "danger",
  unselected: "secondary",
};

const isSelectedOption = (option: QuestionHistory["options"][0]) => {
  return option.alpha.toLowerCase() === option.selected.toLowerCase();
};
const isCorrectOption = (
  question: QuestionHistory,
  option: QuestionHistory["options"][0],
) => {
  return (
    option.alpha.toLowerCase() === question.correct_option.alpha.toLowerCase()
  );
};

const getStatus = (
  question: QuestionHistory,
  option: QuestionHistory["options"][0],
) => {
  return isCorrectOption(question, option)
    ? statuses.correct
    : isSelectedOption(option)
      ? statuses.incorrect
      : statuses.unselected;
};

const isCorrect = (question: QuestionHistory) => {
  return (
    question.correct_option?.alpha?.toLowerCase() ===
    question.selected_option?.toLowerCase()
  );
};

const { questions } = withDefaults(
  defineProps<{ questions: QuestionHistory[] }>(),
  {
    questions: [] as any,
  },
);

const updatedQuestions = questions.map((question) => {
  const correct = isCorrect(question);
  return {
    ...question,
    icon: correct ? HandThumbUpIcon : HandThumbDownIcon,
    iconBackground: correct ? "bg-green-500" : "bg-red-400",
  };
});
</script>
