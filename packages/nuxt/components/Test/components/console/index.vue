<template>
  <div class="content relative">
    <TestComponentsViewResults
      v-if="showViewResults"
      :result-id="testStore.resultId"
      class="content absolute rounded-lg shadow top-0 left-0 bottom-0 bg-white/30 backdrop-blur-sm z-2"
    />
    <TestComponentsSubmitting
      v-if="testStore.state.submitting"
      class="content absolute rounded-lg shadow top-0 left-0 bottom-0 bg-white/30 backdrop-blur-sm z-2"
    />
    <TestComponentsUILoadingSkeleton v-if="loading" class="w-full" />
    <div v-else class="mt-6 overflow-hidden rounded-lg bg-white shadow">
      <div ref="questionRef" class="px-4 py-5 sm:p-6">
        <TestProgressBar :percent="timeElapsed" :value="remainedTime" />
        <TestComponentsUIQuestion :question="question" />
        <!--            <TestComponentsUIExplanation-->
        <!--              :text="question.correct_option_explanation"-->
        <!--            />-->
        <TestComponentsUIOptions
          :options="question.options"
          :select-option-error="selectOptionError"
          @select="selectOption"
        />
      </div>
    </div>
    <TestComponentsUIQuestionControls
      :can-end="canEnd"
      :can-skip="!question.skipped"
      :disabled="loading || showViewResults"
      :submitting="testStore.state.submitting"
      class="mr-12"
      @end="endTest"
      @next="next"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useTestStore } from "../../../../src/store/test";
import { storeToRefs } from "pinia";
import { type Option, type Question } from "../../../../src/types/question";

const props = defineProps({
  questions: {
    default: [],
    type: Array<Question>,
  },
  loading: {
    default: false,
    type: Boolean,
  },
  canEnd: {
    default: false,
    type: Boolean,
  },
});

const testStore = useTestStore();
const questionRef = ref<HTMLButtonElement | null>(null);
const selectOptionError = ref(false);
const { timeElapsed, timer, question, selectedOption, state } =
  storeToRefs(testStore);

const remainedTime = computed(
  () =>
    `${timer.value.hours.value ? timer.value.hours.value + ":" : ""}${timer.value.minutes.value}:${timer.value.seconds.value}`,
);
const showViewResults = computed(
  () =>
    testStore.state.completed && testStore.state.ended && testStore.resultId,
);

const selectOption = (option: Option) => {
  testStore.select(option);
  selectOptionError.value = false;
};

const next = () => {
  if (selectedOption.value == null) {
    selectOptionError.value = true;
  } else {
    selectOptionError.value = false;
    if (!state.value.started) {
      testStore.start();
    } else if (state.value.started && state.value.paused) {
      testStore.resume();
    }
    testStore.next();
    questionRef.value?.scrollIntoView({ behavior: "smooth" });
  }
};

const endTest = () => {
  testStore.submit();
};

watch(
  () => props.questions.length,
  () => {
    testStore.setQuestions(props.questions as any);
  },
  {
    immediate: true,
  },
);
</script>
