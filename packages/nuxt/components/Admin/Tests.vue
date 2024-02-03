<template>
  <div v-if="props.user.tests && props.user.tests.length" class="bg-gray-900">
    <div class="mx-auto max-w-7xl">
      <div class="bg-gray-900 py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold leading-6 text-white">
                Users
              </h1>
              <p class="mt-2 text-sm text-gray-300">
                A list of all the users in your account including their name,
                title, email and role.
              </p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <!-- <button
                type="button"
                class="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                View Stats
              </button> -->
            </div>
          </div>
          <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
              >
                <table class="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                        scope="col"
                      >
                        ID
                      </th>
                      <th
                        class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        scope="col"
                      >
                        Result
                      </th>
                      <th
                        class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        scope="col"
                      >
                        Date
                      </th>
                      <th
                        class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        scope="col"
                      >
                        Demo
                      </th>
                      <th class="relative py-3.5 pl-3 pr-4 sm:pr-0" scope="col">
                        <span class="sr-only">Re submit</span>
                      </th>
                      <th class="relative py-3.5 pl-3 pr-4 sm:pr-0" scope="col">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-800">
                    <tr v-for="test in user.tests" :key="test.id">
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
                      >
                        {{ test.id }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                      >
                        {{ test.result }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                      >
                        {{
                          new Date(test.timestamp).toLocaleDateString("en-CA", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })
                        }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                      >
                        {{ test.demo ? "Yes" : "No" }}
                      </td>
                      <td
                        class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                      >
                        <button
                          :class="{
                            'cursor-pointer': !loading,
                            'cursor-not-allowed': loading,
                          }"
                          :disabled="loading"
                          class="text-indigo-400 hover:text-indigo-300"
                          @click="resubmit(test.id)"
                        >
                          Re Submit
                        </button>
                      </td>
                      <td
                        class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                      >
                        <span
                          class="text-indigo-400 hover:text-indigo-300 cursor-pointer"
                          @click="viewResults(test)"
                          >View Results<span class="sr-only"
                        /></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAdminStore } from "../../src/store/admin";
import { type User, type UserAppMetadata } from "../../src/types/user";

const props = defineProps<{
  user: User;
}>();

const adminStore = useAdminStore();
const router = useRouter();

const viewResults = (test: UserAppMetadata["test_history"][0]) => {
  router.push(`/results/${test.id}`);
};

const loading = computed(() => adminStore.loading);
const resubmit = async (id: string) => {
  const test = props.user.tests_history.find((test: any) => test.id === id);
  if (!test) {
    console.warn("Test not found", props.user.tests_history);
    return;
  }
  await adminStore.reSubmit({ ...test, user_id: props.user.userId });
};
</script>
