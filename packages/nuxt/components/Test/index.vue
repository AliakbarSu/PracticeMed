<template>
  <div>
    <div class="test mb-12 mt-12 p-2 flex justify-center">
      <TestComponentsUILoadingSkeleton
        v-if="loading && hasTestsRemaning"
        class="w-full"
      />
      <TestComponentsInstructions
        v-if="showInstructions && hasTestsRemaning"
        :test="testStore.test"
        @start="start"
      />
      <TestComponentsUICTAUpgradeCTA
        v-if="!hasTestsRemaning"
        :go-back="false"
        btn-text="Subscribe"
        description="Sorry you have reached the limit of free tests. Please subscribe to a paid plan or renew your subscription to continue."
        heading="Test Not Available"
      />
      <TestComponentsConsole
        v-if="showTestModule"
        :loading="testStore.loading"
        :questions="questions"
        class="w-full max-w-7xl"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useTestStore } from "../../src/store/test";
import { storeToRefs } from "pinia";
import type { Question } from "../../src/types/question";

export interface Alerts {
  timeOver: boolean;
  selectOption: boolean;
  readyToSubmit: boolean;
  upgrade: boolean;
}

const route = useRoute();
const testStore = useTestStore();
const questions = ref<Question[]>([]);
const showTestModule = ref(false);
const showInstructions = ref(false);

const { loading, hasTestsRemaning } = storeToRefs(testStore);

const testId = (route.params.id as string) || "";

onMounted(async () => {
  const result = await testStore.loadTest(testId);
  if (result?.length) questions.value = result.slice(0, 5);
  showInstructions.value = true;
});

const start = () => {
  showInstructions.value = false;
  showTestModule.value = true;
};
</script>
