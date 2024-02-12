<template>
  <div class="bg-white px-6 py-32 lg:px-8">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <h1
        class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        Terms & Conditions
      </h1>
      <p class="mt-6 text-xl leading-8">
        To ensure that all users have a positive experience and can benefit from
        our service, we have established the following Terms and Conditions that
        govern access to and use of our platform.
      </p>
      <div class="mt-10 max-w-2xl">
        <ul class="mt-8 max-w-xl space-y-8 text-gray-600" role="list">
          <li v-for="term in props.terms" :key="term.item" class="flex gap-x-3">
            <span
              ><strong class="font-semibold text-gray-900"
                >{{ term.item }}:</strong
              >
              {{ term.description }}</span
            >
          </li>
        </ul>
      </div>
      <p class="mt-6 text-xl leading-8">
        We hope that you find Practice Med to be a valuable resource as you
        prepare for your medical examinations. If you have any questions or
        concerns about our service or these Terms and Conditions, please do not
        hesitate to contact us.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  terms: TermsAndConditions[];
}>();

export type TermsAndConditions = {
  item: string;
  description: string;
};
</script>
