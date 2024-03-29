<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          Frequently asked questions
        </h2>
        <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
          <Disclosure
            v-for="faq in faqs"
            :key="faq.question"
            v-slot="{ open }"
            as="div"
            class="pt-6"
          >
            <dt>
              <DisclosureButton
                class="flex w-full items-start justify-between text-left text-gray-900"
              >
                <span class="text-base font-semibold leading-7">{{
                  faq.question
                }}</span>
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    v-if="!open"
                    aria-hidden="true"
                    class="h-6 w-6"
                  />
                  <MinusSmallIcon v-else aria-hidden="true" class="h-6 w-6" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <p class="text-base leading-7 text-gray-600">{{ faq.answer }}</p>
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/vue/24/outline";

const faqs = ref<{ question: string; answer: string }[]>([]);
const { data } = await useFetch(`/api/faqs`);
faqs.value = data.value;

useSeoMeta({
  title: "FAQS | Practice Med",
  description:
    "Our FAQ page is designed to answer your common questions about our AMC MCQ mock tests.",
  ogTitle: "PracticeMed - FAQS - AMC mock tests",
  ogDescription: "Providing amc mcq mock tests with detailed feedback.",
  ogImage:
    "https://res.cloudinary.com/dxuf2ssx6/image/upload/c_scale,w_1200/v1682630656/practiceMed/Illustrations/hero_image.png",
  ogUrl: "https://practicemed.org",
  ogType: "website",
});
</script>
