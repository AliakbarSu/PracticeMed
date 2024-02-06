<template>
  <div>
    <TestComponentsAlertsReadyToSubmit
      v-if="alerts.readyToSubmit"
      :submitting="state.submitting"
      @cancel="cancelAlert('readyToSubmit')"
      @submit="testStore.submit"
    />
    <TestComponentsAlertsSelectOption
      v-if="alerts.selectOption"
      @cancel="cancelAlert('selectOption')"
    />
    <TestComponentsAlertsTimeOver
      v-if="alerts.timeOver"
      :submitting="state.submitting"
      @cancel="cancelAlert('timeOver')"
      @view="viewResults"
    />
    <div class="test mb-12 p-2">
      <TestComponentsUILoadingSkeleton v-if="loading" />
      <TestComponentsInstructions
        v-if="!loading && hasTestsRemaning && !state.started"
        :test="test"
        @start="start"
      />
      <TestComponentsUICTAUpgradeCTA v-if="!hasTestsRemaning" />
      <TestComponentsUICTAUpgradeCTA
        v-if="alerts.upgrade"
        :go-back="false"
        description="Congratulations on completing the preview test! To gain access to the full range of tests and elevate your learning experience, upgrade to our Premium Plan now."
        heading="Unlock Unlimited Access with Our Premium Plan!"
      />
      <div v-if="state.started && !alerts.upgrade && !loading" class="content">
        <div class="overflow-hidden rounded-lg bg-white shadow">
          <div class="px-4 py-5 sm:p-6">
            <TestComponentsUITimeDisplay :time="timer" />
            <TestComponentsUITimeProgressBar :value="timeElapsed" />
          </div>
        </div>

        <div class="mt-6 overflow-hidden rounded-lg bg-white shadow">
          <div ref="questionRef" class="px-4 py-5 sm:p-6">
            <TestComponentsUIQuestion :question="question" />
            <TestComponentsUIExplanation
              :text="question.correct_option_explanation"
            />
            <!-- <CircularTimer/> -->
            <TestComponentsUIOptions
              :options="question.options"
              @select="testStore.select"
            />
          </div>
        </div>
        <TestComponentsUIQuestionControls
          :can-end="true"
          :can-skip="!question.skipped"
          :submitting="testStore.state.submitting"
          class="mr-12"
          @end="endTestAlert"
          @next="next"
          @skip="testStore.skip"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTestStore } from "../../src/store/test";
import { storeToRefs } from "pinia";

export interface Alerts {
  timeOver: boolean;
  selectOption: boolean;
  readyToSubmit: boolean;
  upgrade: boolean;
}

const questionRef = ref<HTMLButtonElement | null>(null);
const router = useRouter();
const route = useRoute();

const testStore = useTestStore();

const {
  timeElapsed,
  timer,
  loading,
  question,
  test,
  hasTestsRemaning,
  isTimeOver,
  previewMode,
  selectedOption,
  resultId,
  state,
} = storeToRefs(testStore);

const alerts = reactive({
  timeOver: false,
  selectOption: false,
  readyToSubmit: false,
  endTest: false,
  upgrade: false,
} as Alerts);

const testId = (route.params.id as string) || "";
const preview = route.query.preview === "true";
if (preview) {
  testStore.loadDemoTest();
} else {
  testStore.loadTest(testId);
}

const setAlert = (key: keyof Alerts) => {
  alerts[key] = true;
};
const cancelAlert = (key: keyof Alerts) => {
  alerts[key] = false;
};
const viewResults = () => {
  router.push(`/results/${resultId.value}`);
};
const endTestAlert = () => {
  setAlert("readyToSubmit");
};

const start = () => {
  testStore.start();
};

const next = () => {
  if (selectedOption.value == null) {
    setAlert("selectOption");
  } else {
    testStore.next();
    questionRef.value?.scrollIntoView({ behavior: "smooth" });
  }
};

watchEffect(() => {
  if (isTimeOver.value && !previewMode.value) {
    setAlert("timeOver");
  }
});

watchEffect(() => {
  if (state.value.ended && previewMode.value) {
    // setAlert("upgrade");
  }
});

watchEffect(() => {
  if (resultId.value) {
    viewResults();
  }
});
</script>
