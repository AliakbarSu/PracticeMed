<template>
  <div class="test mb-12 p-2 bg-white w-full">
    <div class="text-center sm:w-2/3 md:1/3 mx-auto">
      <p class="w-3/4 mx-auto mt-4 text-lg leading-8 text-gray-900">
        Please sign up or sign in to continue with the test.
      </p>
      <div class="flex gap-2 w-2/5 md:w-2/5 justify-around m-auto pt-5">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
          @click="signin"
        >
          Sign in
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
          @click="signup"
        >
          Sign up
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  loginWithRedirect,
  signup as createAccount,
} from "../../../../src/auth";

const signin = async () => {
  await loginWithRedirect();
};

const signup = async () => {
  await createAccount();
};
</script>
