<template>
  <div v-if="displayMockTest" ref="signupRef" class="test mb-12 p-2 bg-white">
    <div class="text-center sm:w-2/3 md:1/3 mx-auto">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Try our demo mock test
      </h2>
      <p
        v-if="!neesToUpgrade"
        class="w-3/4 mx-auto mt-4 text-lg leading-8 text-gray-900"
      >
        Take our demo mock test to get a feel for the format.
      </p>
    </div>
    <HomeComponentsTestViewResultsRedirect :test-id="testStore.resultId" />
    <TestComponentsUILoadingSkeleton v-if="UIStore.test.loading" />
    <HomeComponentsTestSignupMessage v-if="needToSignup" />
    <HomeComponentsTestSignupModal v-if="needToSignup" />
    <HomeComponentsTestUpgradeMessage v-if="neesToUpgrade" />
    <TestComponentsAlertsReadyToSubmit
      v-if="flags.readyToSubmit"
      @cancel="flags.readyToSubmit = false"
      @submit="testStore.submit"
    />
    <TestComponentsAlertsSelectOption
      v-if="flags.selectOption"
      @cancel="flags.selectOption = false"
    />
    <div v-if="displayTestConsole && !neesToUpgrade" class="content">
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
        :submitting="testStore.submitting"
        class="mr-12"
        @end="endTest"
        @next="next"
        @skip="testStore.skip"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useTestStore } from "../../../../src/store/test";
import { useAppStore } from "../../../../src/store/main";
import { useAuthStore } from "../../../../src/store/auth";
import { useUIStore } from "../../../../src/store/UI";
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
const UIStore = useUIStore();
const planStore = usePlansStore();

onMounted(async () => {
  await testStore.loadDemoTest();
});

onBeforeRouteLeave(() => {
  testStore.resultId = null;
});

const needToSignup = computed(
  () => !authStore.isAuthenticated && testStore.testEnded,
);
const displayTestConsole = computed(
  () => !testStore.loading && !needToSignup.value && testStore.testStarted,
);

const displayMockTest = computed(
  () => !planStore.userHasActivePlan || appStore.canTryMockTest,
);

const neesToUpgrade = computed(
  () => !planStore.userHasActivePlan && !appStore.canTryMockTest,
);

const next = () => {
  if (testStore.selectedOption == null) {
    flags.selectOption = true;
  } else {
    testStore.next();
    questionRef.value?.scrollIntoView({ behavior: "smooth" });
  }
};

const endTest = () => {
  testStore.submit();
};

watch(
  [() => authStore.isAuthenticated, () => testStore.test],
  ([isAuth, test]) => {
    if (isAuth && test) {
      testStore.setAllQuestions();
      if (!testStore.testStarted) {
        testStore.start();
      }
      testStore.demoMode = false;
    } else {
      testStore.setDemoQuestions();
      testStore.start();
    }
  },
  { immediate: true },
);
</script>
