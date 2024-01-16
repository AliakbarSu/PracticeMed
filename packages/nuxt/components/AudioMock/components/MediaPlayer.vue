<template>
  <div
    class="bg-slate-200 w-full max-w-[768px] flex justify-start items-center p-4 relative max-h-40 shadow-sm rounded-md"
  >
    <p class="pl-3 text-2xl font-semibold grow">
      Sample Question<br /><span class="text-lg font-normal"></span>
    </p>
    <span
      class="clear-left rounded-full bg-[#eff0f9] p-4 cursor-pointer group [&_*]:transition-all [&_*]:duration-150 [&_*]:ease-in"
    >
      <span
        @click="playPause"
        class="px-3 py-3 block bg-white rounded-full shadow-md group-hover:bg-rose-600"
      >
        <svg
          v-if="!playing"
          xmlns="http://www.w3.org/2000/svg"
          class="group-hover:fill-white group-hover:stroke-white"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#7e9cff"
          fill="#7e9cff"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 4v16l13 -8z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="group-hover:fill-white group-hover:stroke-white"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#7e9cff"
          fill="#7e9cff"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="#7e9cff" />
          <!-- <path d="M12 4v16l13 12z" /> -->
        </svg>
      </span>
      <audio
        ref="audioRef"
        controls
        class="hidden"
        @play="playing = true"
        @pause="playing = false"
      >
        <source
          src="https://practicemed-audio-mcqs.s3.ap-southeast-2.amazonaws.com/question%3D12e6d415-c0ba-452e-bae6-159e92052a2f.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </span>
  </div>
</template>

<script lang="ts" setup>
const audioRef = ref<HTMLAudioElement | null>(null)
const playing = ref(false)

const playPause = () => {
  if (audioRef.value?.paused) {
    audioRef.value?.play()
  } else {
    audioRef.value?.pause()
  }
}
</script>
