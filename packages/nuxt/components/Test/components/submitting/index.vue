<template>
  <div class="flex items-center bg-white w-full py-48">
    <div class="text-center sm:w-2/3 md:1/3 mx-auto">
      <div
        class="flex flex-wrap justify-center gap-2 w-2/3 md:w-2/3 m-auto pt-5"
      >
        <ProgressSpinner
          animation-duration=".5s"
          aria-label="Custom ProgressSpinner"
          fill="var(--surface-ground)"
          stroke-width="8"
          style="width: 50px; height: 50px"
        />
        <span class="w-full">Calculating the results! Hold tight!</span>
      </div>
    </div>
  </div>
</template>
