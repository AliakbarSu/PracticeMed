<template>
  <div class="flex items-center bg-white w-full py-48">
    <div class="text-center sm:w-2/3 md:1/3 mx-auto">
      <!--      <p class="w-3/4 mx-auto mt-4 text-lg leading-8 text-gray-900">-->
      <!--        Click to view your results.-->
      <!--      </p>-->
      <div class="flex gap-2 justify-around m-auto pt-5">
        <NuxtLink
          :to="`/results/${props.resultId}`"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Test Results
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  resultId: {
    default: "",
    type: String,
    required: false,
  },
});
</script>
