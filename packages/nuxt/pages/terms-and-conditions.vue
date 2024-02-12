<template>
  <TermsAndConditions :terms="terms" />
</template>

<script lang="ts" setup>
import { ref } from "vue";

export type TermsAndConditions = {
  item: string;
  description: string;
};

const terms = ref([] as TermsAndConditions[]);
const { data } = await useFetch<TermsAndConditions[]>(`/api/terms_conditions`);
if (data.value) {
  terms.value = data.value as any;
}
</script>
