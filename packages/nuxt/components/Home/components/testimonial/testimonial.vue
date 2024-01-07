<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-xl text-center">
        <h2
          class="text-lg font-semibold leading-8 tracking-tight text-indigo-600"
        >
          Testimonials
        </h2>
        <p
          class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Some of the feedbacks we received from our users
        </p>
      </div>
      <div
        class="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none"
      >
        <div class="-mt-8 sm:-mx-4 flex flex-wrap sm:flex-nowrap sm:text-[0]">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.author.name"
            class="pt-8 sm:inline-block sm:w-full sm:px-4"
          >
            <figure class="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
              <blockquote class="text-gray-900">
                <p>{{ `“${testimonial.body}”` }}</p>
              </blockquote>
              <figcaption class="mt-6 flex items-center gap-x-4">
                <!-- <img
                  class="h-10 w-10 rounded-full bg-gray-50"
                  :src="testimonial.author.imageUrl"
                  alt=""
                /> -->
                <div>
                  <div class="font-semibold text-gray-900">
                    {{ testimonial.author.name }}
                  </div>
                  <!-- <div class="text-gray-600">
                    {{ `@${testimonial.author.handle}` }}
                  </div> -->
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const testimonials = [
  {
    body: "I'm so grateful for this. It was difficult to find quality resources for medical exam preparation. But Practice Med was a game-changer for me. Thanks to the practice tests and feedback reports, I was able to pass my test on my first attempt. Thank you!",
    author: {
      name: 'Ibrahim'
    }
  },
  {
    body: 'I highly recommend this service to anyone preparing for multiple choice exams. The practice tests are challenging but accurate, and the feedback reports helped me identify my weak areas and improve my performance.',
    author: {
      name: 'Faris'
    }
  },
  {
    body: "What an absolute lifesaver! I was struggling to prepare for my MCQ exam, but with the help of the practice tests, I was able to pass on my second attempt. I'm so grateful for the existence of such service",
    author: {
      name: 'Hossein'
    }
  }
  // {
  //   body: 'As someone from Eastern Europe, it can be difficult to navigate the medical exam process in other countries. But this Practice Med made it so much easier for me. The practice tests were excellent, and the feedback reports helped me focus my study efforts. Thanks to this platform, I was able to pass the USMLE Step 1 exam on my first attempt.',
  //   author: {
  //     name: 'Elena, Russia'
  //   }
  // },
  // {
  //   body: 'I had taken the AMC MCQ exam twice before and failed both times. I was feeling pretty discouraged until I found this platform. The practice tests were incredibly helpful, and the feedback reports helped me understand exactly where I needed to improve. Thanks to this platform, I was able to pass the exam on my third attempt. Thank you!',
  //   author: {
  //     name: 'Hasan, Iran'
  //   }
  // },
  // {
  //   body: "This platform was a game-changer for me. The practice tests were challenging and accurate, and the feedback reports helped me focus my study efforts. Thanks to this platform, I was able to pass the USMLE Step 1 exam on my first attempt. I couldn't have done it without you!",
  //   author: {
  //     name: 'Maria, Bulgaria'
  //   }
  // },
  // {
  //   body: 'I was feeling overwhelmed by the amount of material I needed to know for the AMC MCQ exam, but this platform made it so much more manageable. The practice tests were comprehensive and accurate, and the feedback reports helped me identify my weak areas.',
  //   author: {
  //     name: 'Ziad, UK'
  //   }
  // }
  // {
  //   body: "I'm so glad I found this platform. The practice tests were challenging and realistic, and the feedback reports helped me focus my study efforts. Thanks to this platform, I was able to pass the USMLE Step 1 exam on my first attempt. I would highly recommend this platform to anyone preparing for a medical exam.",
  //   author: {
  //     name: ''
  //   }
  // },
  // {
  //   body: "This platform was an absolute lifesaver for me. The practice tests were comprehensive and accurate, and the feedback reports helped me understand exactly where I needed to focus my study efforts. Thanks to this platform, I was able to pass the AMC MCQ exam on my first attempt. I couldn't be happier with my experience.",
  //   author: {
  //     name: 'Ahmed, Saudi Arabia'
  //   }
  // }
]
</script>
