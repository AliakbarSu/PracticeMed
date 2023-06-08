<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Resources
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">
          Learn how to pass your medical licensing exam with our expert advice.
        </p>
        <div
          class="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16"
        >
          <article
            v-for="post in posts"
            :key="post.id"
            class="flex max-w-xl flex-col items-start justify-between"
          >
            <div class="flex items-center gap-x-4 text-xs">
              <time :datetime="post.datetime" class="text-gray-500">{{
                post.date
              }}</time>
              <NuxtLink
                as="as"
                :href="post.category.href"
                class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >{{ post.category.title }}</NuxtLink
              >
            </div>
            <div class="group relative">
              <h3
                class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
              >
                <a :href="post.href">
                  <span class="absolute inset-0" />
                  {{ post.title }}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {{ post.description }}
              </p>
            </div>
            <div class="hidden relative mt-8 items-center gap-x-4">
              <img
                :src="post.author.imageUrl"
                alt=""
                class="h-10 w-10 rounded-full bg-gray-50"
              />
              <div class="text-sm leading-6">
                <p class="font-semibold text-gray-900">
                  <a :href="post.author.href">
                    <span class="absolute inset-0" />
                    {{ post.author.name }}
                  </a>
                </p>
                <p class="text-gray-600">{{ post.author.role }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const posts = [
  {
    id: 1,
    title: 'Mastering the AMC MCQ Exam: Your Ultimate Preparation Guide',
    href: '/resources/amc/prepare',
    description:
      'The Australian Medical Council (AMC) MCQ (Multiple Choice Question) Exam is a crucial step in the journey to becoming a medical professional. To excel in this challenging exam, a well-rounded and comprehensive preparation strategy is essential.',
    date: '8 May, 2023',
    datetime: '2023-05-08',
    category: { title: 'AMC', href: '/landing/amc-mcq' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  },
  {
    id: 2,
    title:
      'Securing Employment in Australia After Successfully Passing the AMC MCQ Exam',
    href: '/resources/amc/find-job',
    description:
      'Passing the Australian Medical Council (AMC) MCQ (Multiple Choice Question) Exam is a significant accomplishment on your journey to practicing medicine in Australia...',
    date: '19 May, 2023',
    datetime: '2023-05-19',
    category: { title: 'AMC', href: '/landing/amc-mcq' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  }
]

useSeoMeta({
  title:
    'Resource about how to prepare and pass your AMC MCQ exam | Practice Med',
  description:
    'Resrouces to prepare for your medical licensing exam including AMC MCQ'
})
</script>
