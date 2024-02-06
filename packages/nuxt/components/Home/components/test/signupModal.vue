<template>
  <!--  <TransitionRoot :show="open && !UIStore.signupModal" as="template">-->
  <!--    <Dialog as="div" class="relative z-10" @close="close">-->
  <!--      <TransitionChild-->
  <!--        as="template"-->
  <!--        enter="ease-out duration-300"-->
  <!--        enter-from="opacity-0"-->
  <!--        enter-to="opacity-100"-->
  <!--        leave="ease-in duration-200"-->
  <!--        leave-from="opacity-100"-->
  <!--        leave-to="opacity-0"-->
  <!--      >-->
  <!--        <div-->
  <!--          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"-->
  <!--        />-->
  <!--      </TransitionChild>-->

  <!--      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">-->
  <!--        <div-->
  <!--          class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"-->
  <!--        >-->
  <!--          <TransitionChild-->
  <!--            as="template"-->
  <!--            enter="ease-out duration-300"-->
  <!--            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"-->
  <!--            enter-to="opacity-100 translate-y-0 sm:scale-100"-->
  <!--            leave="ease-in duration-200"-->
  <!--            leave-from="opacity-100 translate-y-0 sm:scale-100"-->
  <!--            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"-->
  <!--          >-->
  <!--            <DialogPanel-->
  <!--              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"-->
  <!--            >-->
  <!--              <div>-->
  <!--                <XCircleIcon-->
  <!--                  aria-hidden="true"-->
  <!--                  class="cursor-pointer h-5 w-5 text-grey"-->
  <!--                  @click="close"-->
  <!--                />-->
  <!--                <div-->
  <!--                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"-->
  <!--                >-->
  <!--                  <UserIcon aria-hidden="true" class="h-6 w-6 text-green-600" />-->
  <!--                </div>-->
  <!--                <div class="mt-3 text-center sm:mt-5">-->
  <!--                  <DialogTitle-->
  <!--                    as="h3"-->
  <!--                    class="text-base font-semibold leading-6 text-gray-900"-->
  <!--                    >Create an account to continue-->
  <!--                  </DialogTitle>-->
  <!--                  <div class="mt-2">-->
  <!--                    <p class="text-sm text-gray-500">-->
  <!--                      Please sign up or sign in to continue with the test.-->
  <!--                    </p>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="flex gap-2 mt-5 sm:mt-6">-->
  <!--                <button-->
  <!--                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"-->
  <!--                  type="button"-->
  <!--                  @click="signin"-->
  <!--                >-->
  <!--                  Sign In-->
  <!--                </button>-->
  <!--                <button-->
  <!--                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"-->
  <!--                  type="button"-->
  <!--                  @click="signup"-->
  <!--                >-->
  <!--                  Sign Up-->
  <!--                </button>-->
  <!--              </div>-->
  <!--            </DialogPanel>-->
  <!--          </TransitionChild>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </Dialog>-->
  <!--  </TransitionRoot>-->
</template>

<script lang="ts" setup>
import { useUIStore } from "../../../../src/store/UI";
import { signupWithPopup } from "../../../../src/auth";
// import {
//   Dialog,
//   DialogPanel,
//   DialogTitle,
//   TransitionChild,
//   TransitionRoot,
// } from "@headlessui/vue";

// import { UserIcon, XCircleIcon } from "@heroicons/vue/24/outline";

// const open = ref(true);
const UIStore = useUIStore();

// const close = () => {
//   // open.value = false;
//   UIStore.signupModal = true;
// };

// const signin = async () => {
//   await loginWithRedirect();
//   // open.value = false;
// };

try {
  if (UIStore.signupModal) {
    await signupWithPopup();
  }
} finally {
  UIStore.signupModal = false;
}

// const signup = async () => {
//   await signupWithPopup
//   open.value = false;
// };
</script>
