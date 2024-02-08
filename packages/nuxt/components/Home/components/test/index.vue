<template>
  <div
    v-if="displayMockTest"
    ref="signupRef"
    class="test mb-12 p-2 bg-white flex flex-wrap justify-center"
  >
    <div class="text-center sm:w-2/3 md:1/3 mx-auto">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Try our demo mock test
      </h2>
      <p
        v-if="!needsToUpgrade"
        class="w-3/4 mx-auto mt-4 text-lg leading-8 text-gray-900"
      >
        Take our demo mock test to get a feel for the format.
      </p>
    </div>
    <HomeComponentsTestViewResultsRedirect :test-id="testStore.resultId" />
    <div v-if="testStore.loading && !needToSignup" class="w-full">
      <TestComponentsUILoadingSkeleton />
    </div>
    <HomeComponentsTestSignupMessage v-if="needToSignup" />
    <HomeComponentsTestSignupModal v-if="needToSignup" />
    <HomeComponentsTestUpgradeMessage v-if="needsToUpgrade" />
    <TestComponentsAlertsReadyToSubmit
      v-if="flags.readyToSubmit"
      @cancel="flags.readyToSubmit = false"
      @submit="testStore.submit"
    />
    <TestComponentsAlertsSelectOption
      v-if="flags.selectOption"
      @cancel="flags.selectOption = false"
    />
    <div
      v-if="displayTestConsole && !needsToUpgrade"
      class="content max-w-7xl mt-3"
    >
      <TestProgressBar :percent="testStore.timeElapsed" :value="remainedTime" />
      <div class="mt-6 overflow-hidden rounded-lg bg-white shadow">
        <div ref="questionRef" class="px-4 py-5 sm:p-6">
          <TestComponentsUIQuestion :question="testStore.question" />
          <TestComponentsUIOptions
            :options="testStore.question.options"
            @select="testStore.select"
          />
        </div>
      </div>
      <TestComponentsUIQuestionControls
        :can-skip="!testStore.question.skipped"
        :disabled="testStore.state.completed"
        :submitting="testStore.state.submitting"
        class="mr-12"
        @end="testStore.submit"
        @next="next"
        @skip="testStore.skip"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useTestStore } from "../../../../src/store/test";
import { useAppStore } from "../../../../src/store/main";
import { useAuthStore } from "../../../../src/store/auth";
import { usePlansStore } from "../../../../src/store/plans";

export interface Flags {
  endTest: boolean;
  timeOver: boolean;
  selectOption: boolean;
  readyToSubmit: boolean;
}

const questionRef = ref<HTMLDivElement | null>(null);
const signupRef = ref<HTMLDivElement | null>(null);

const flags = reactive({
  timeOver: false,
  selectOption: false,
  readyToSubmit: false,
  endTest: false,
});

const testStore = useTestStore();
const appStore = useAppStore();
const authStore = useAuthStore();
const planStore = usePlansStore();

onMounted(async () => {
  await testStore.loadDemoTest();
});

onBeforeRouteLeave(() => {
  testStore.resultId = null;
});

const needToSignup = computed(
  () =>
    !authStore.isAuthenticated &&
    testStore.state.ended &&
    testStore.state.started,
);
const displayTestConsole = computed(
  () => !testStore.loading && !needToSignup.value && testStore.question,
);

const displayMockTest = computed(
  () => !planStore.userHasActivePlan || appStore.canTryMockTest,
);

const needsToUpgrade = computed(
  () => !planStore.userHasActivePlan && !appStore.canTryMockTest,
);

const remainedTime = computed(() => {
  return `${testStore.timer.minutes.value}:${testStore.timer.seconds.value}`;
});

const next = () => {
  if (testStore.selectedOption == null) {
    flags.selectOption = true;
  } else {
    if (!testStore.state.started) {
      testStore.start();
    }
    testStore.next();
    questionRef.value?.scrollIntoView({ behavior: "smooth" });
  }
};

onBeforeUnmount(() => {
  if (testStore.timer.isRunning.value) {
    testStore.pause();
  }
});

watch(
  [() => authStore.isAuthenticated, () => testStore.test?.questions],
  async ([isAuth, questions]) => {
    if (isAuth && questions) {
      testStore.setAllQuestions();
      testStore.demoMode = false;
    } else if (questions) {
      testStore.setDemoQuestions();
    }
    if (testStore.state.started) {
      testStore.resume();
    }
  },
  {
    immediate: true,
  },
);

watch(
  [() => needToSignup.value, () => testStore.state.started],
  ([signup, started]) => {
    if (signup && started) {
      testStore.pause();
    }
  },
  { immediate: true },
);
</script>
