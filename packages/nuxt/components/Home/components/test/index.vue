<template>
  <div
    ref="signupRef"
    class="test mb-12 p-2 bg-white flex flex-wrap justify-center"
  >
    <HomeComponentsTestSignupModal v-if="showSignUpModal" />
    <HomeComponentsTestHeading />
    <HomeComponentsTestSignupMessage v-if="showSignUpMessage" />
    <TestComponentsConsole
      v-if="showTestModule"
      :loading="testStore.loading"
      :questions="questions"
      class="w-full max-w-7xl mt-5"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useTestStore } from "../../../../src/store/test";
import { useAuthStore } from "../../../../src/store/auth";
import { type Question } from "../../../../src/types/question";

const PRE_SIGNUP_MAX_QUESTION_INDEX = 9;

const testStore = useTestStore();
const authStore = useAuthStore();
const signupRef = ref<HTMLDivElement | null>(null);
const questions = ref<Question[]>([]);

const isAuthenticated = computed(() => authStore.isAuthenticated);
const showSignUpMessage = ref(false);

onMounted(async () => {
  const result = await testStore.loadDemoTest();
  if (result?.length) questions.value = result;
});

const showSignUpModal = computed(() => showSignUpMessage.value);
const showTestModule = computed(() => !showSignUpMessage.value);

watch(
  [() => testStore.questionIndexes.current, () => isAuthenticated.value],
  ([currentIndex, isAuth]) => {
    if (currentIndex == PRE_SIGNUP_MAX_QUESTION_INDEX && !isAuth) {
      testStore.pause();
      showSignUpMessage.value = true;
    } else if (isAuth) {
      showSignUpMessage.value = false;
    }
  },
  {
    immediate: true,
  },
);
</script>
