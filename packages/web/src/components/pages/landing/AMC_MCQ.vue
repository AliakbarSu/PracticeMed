<template>
  <div class="bg-white">
    <!-- Header -->

    <main>
      <!-- Hero section -->
      <div
        class="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20"
      >
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          alt=""
          class="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
          />
        </div>
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div class="hidden sm:mb-8 sm:flex sm:justify-center">
              <div
                class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20"
              >
                Announcing our new mock test.
                <RouterLink to="/dashboard" class="font-semibold text-white"
                  ><span class="absolute inset-0" aria-hidden="true" />Read more
                  <span aria-hidden="true">&rarr;</span></RouterLink
                >
              </div>
            </div>
            <div class="text-center">
              <h1
                class="text-4xl font-bold tracking-tight text-white sm:text-6xl"
              >
                Pass Your AMC MCQ Exam with Confidence
              </h1>
              <p class="mt-6 text-lg leading-8 text-gray-300">
                Enhance Your Test-Taking Skills with Comprehensive Practice
                Tests and Personalized Feedback.
              </p>
              <div class="mt-10 flex items-center justify-center gap-x-6">
                <RouterLink
                  to="/test/try-it-now?preview=true"
                  class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                  >Try it now</RouterLink
                >
                <RouterLink
                  to="/about"
                  class="text-sm font-semibold leading-6 text-white"
                  >Lear more <span aria-hidden="true">→</span></RouterLink
                >
              </div>
            </div>
          </div>

          <!-- Logo cloud -->
          <!-- <div
            class="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"
          >
            <img
              class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
              alt="Transistor"
              width="158"
              height="48"
            />
            <img
              class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg"
              alt="Reform"
              width="158"
              height="48"
            />
            <img
              class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg"
              alt="Tuple"
              width="158"
              height="48"
            />
            <img
              class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg"
              alt="SavvyCal"
              width="158"
              height="48"
            />
            <img
              class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg"
              alt="Statamic"
              width="158"
              height="48"
            />
          </div> -->
        </div>
        <div
          class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
          />
        </div>
      </div>

      <!-- Testimonial section -->
      <div
        class="relative z-10 mt-32 bg-gray-900 pb-20 sm:mt-56 sm:pb-24 xl:pb-0"
      >
        <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            class="absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl"
          >
            <div
              class="aspect-[1097/1023] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
              style="
                clip-path: polygon(
                  74.1% 44.1%,
                  100% 61.6%,
                  97.5% 26.9%,
                  85.5% 0.1%,
                  80.7% 2%,
                  72.5% 32.5%,
                  60.2% 62.4%,
                  52.4% 68.1%,
                  47.5% 58.3%,
                  45.2% 34.5%,
                  27.5% 76.7%,
                  0.1% 64.9%,
                  17.9% 100%,
                  27.6% 76.8%,
                  76.1% 97.7%,
                  74.1% 44.1%
                );
              "
            />
          </div>
        </div>
        <div
          class="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch"
        >
          <div class="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
            <div
              class="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto"
            >
              <img
                class="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                src="https://res.cloudinary.com/dxuf2ssx6/image/upload/v1683247105/practiceMed/Thumbnails/stephanie-liverani-Zz5LQe-VSMY-unsplash.jpg"
                alt=""
              />
            </div>
          </div>
          <div
            class="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24"
          >
            <figure class="relative isolate pt-6 sm:pt-12">
              <svg
                viewBox="0 0 162 128"
                fill="none"
                aria-hidden="true"
                class="absolute left-0 top-0 -z-10 h-32 stroke-white/20"
              >
                <path
                  id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                  d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                />
                <use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x="86" />
              </svg>
              <blockquote
                class="text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9"
              >
                <p>
                  'I highly recommend this service to anyone preparing for AMC
                  MCQ exam. The practice tests are challenging but accurate, and
                  the feedback reports helped me identify my weak areas and
                  improve my performance. I passed the AMC MCQ exam on my first
                  attempt. Super happy!'
                </p>
              </blockquote>
              <figcaption class="mt-8 text-base">
                <div class="font-semibold text-white">Andrei</div>
                <div class="mt-1 text-gray-400">From Romania</div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <!-- Feature section -->
      <div class="mt-32 sm:mt-56">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl sm:text-center">
            <h2 class="text-base font-semibold leading-7 text-indigo-600">
              Everything you need to prepare for your AMC MCQ exam
            </h2>
            <p
              class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Not ready to make a commitment yet? No problem.
            </p>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              Start with our free trial and decide later.
            </p>
          </div>
        </div>
        <div class="relative overflow-hidden pt-16">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <img
              src="https://res.cloudinary.com/dxuf2ssx6/image/upload/v1682630656/practiceMed/Illustrations/hero_image.png"
              alt="App screenshot"
              class="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
              width="2432"
              height="1442"
            />
            <div class="relative" aria-hidden="true">
              <div
                class="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]"
              />
            </div>
          </div>
        </div>
        <div class="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl
            class="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
          >
            <div
              v-for="feature in features"
              :key="feature.name"
              class="relative pl-9"
            >
              <dt class="inline font-semibold text-gray-900">
                <component
                  :is="feature.icon"
                  class="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                  aria-hidden="true"
                />
                {{ feature.name }}
              </dt>
              {{ ' ' }}
              <dd class="inline">{{ feature.description }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Pricing section -->
      <div class="relative isolate mt-32 bg-white px-6 sm:mt-56 lg:px-8">
        <div
          class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
          aria-hidden="true"
        >
          <div
            class="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
          />
        </div>
        <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">
            Pricing
          </h2>
          <p
            class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            The right price for you, whoever you are
          </p>
        </div>
        <p
          class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600"
        >
          Customizable Subscription Options for Aspiring Medical Professionals
        </p>
        <div
          class="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2"
        >
          <div
            v-for="(tier, tierIdx) in shortPlans"
            :key="tier.id"
            :class="[
              tier.mostPopular
                ? 'relative bg-gray-900 shadow-2xl'
                : 'bg-white/60 sm:mx-8 lg:mx-0',
              tier.mostPopular
                ? ''
                : tierIdx === 0
                ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10'
            ]"
          >
            <h3
              :id="tier.id"
              :class="[
                tier.mostPopular ? 'text-indigo-400' : 'text-indigo-600',
                'text-base font-semibold leading-7'
              ]"
            >
              {{ tier.name }}
            </h3>
            <p class="mt-4 flex items-baseline gap-x-2">
              <span
                :class="[
                  tier.mostPopular ? 'text-white' : 'text-gray-900',
                  'text-5xl font-bold tracking-tight'
                ]"
                >{{ tier.price }}</span
              >
              <span
                :class="[
                  tier.mostPopular ? 'text-gray-400' : 'text-gray-500',
                  'text-base'
                ]"
                >/month</span
              >
            </p>
            <p
              :class="[
                tier.mostPopular ? 'text-gray-300' : 'text-gray-600',
                'mt-6 text-base leading-7'
              ]"
            >
              {{ tier.description }}
            </p>
            <ul
              role="list"
              :class="[
                tier.mostPopular ? 'text-gray-300' : 'text-gray-600',
                tier.mostPopular ? 'space-y-12' : 'space-y-2',
                'mt-8 space-y-3 text-sm leading-6 sm:mt-10'
              ]"
            >
              <li
                v-for="feature in tier.features"
                :key="feature"
                class="flex gap-x-3"
              >
                <CheckIcon
                  :class="[
                    tier.mostPopular ? 'text-indigo-400' : 'text-indigo-600',
                    'h-6 w-5 flex-none'
                  ]"
                  aria-hidden="true"
                />
                {{ feature }}
              </li>
            </ul>
            <GetPlanButton :profile="profile" :plan="tier" :loading="loading" />
          </div>
        </div>
      </div>

      <!-- FAQ section -->
      <div class="mx-auto mt-32 mb-16 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2
            class="text-2xl font-bold leading-10 tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
            <Disclosure
              as="div"
              v-for="faq in faqs"
              :key="faq.question"
              class="pt-6"
              v-slot="{ open }"
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
                      class="h-6 w-6"
                      aria-hidden="true"
                    />
                    <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                  </span>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as="dd" class="mt-2 pr-12">
                <p class="text-base leading-7 text-gray-600">
                  {{ faq.answer }}
                </p>
              </DisclosurePanel>
            </Disclosure>
          </dl>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'
import { CheckIcon } from '@heroicons/vue/20/solid'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/main'
import { usePlansStore } from '@/store/plans'
import GetPlanButton from '@/components/containers/plans/components/Buttons/GetPlan.vue'
import { computed } from 'vue'
import {
  CurrencyDollarIcon,
  ChartPieIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon
} from '@heroicons/vue/20/solid'

const store = useAppStore()
const plansStore = usePlansStore()

const { profile } = storeToRefs(store)
const { loading, plans } = storeToRefs(plansStore)
const features = [
  {
    name: 'Comprehensive Test Coverage',
    description:
      'Our service offers a range of mock medical exams to help students prepare for their medical exams. Our tests cover all essential topics and subtopics, so students can gain a complete understanding of the material.',
    icon: ChartPieIcon
  },
  {
    name: 'Realistic Exam Experience',
    description:
      'All the tests are designed to simulate the actual medical exam experience, including timing, format, and difficulty level. This allows students to become comfortable with the testing environment and be better prepared on exam day.',
    icon: ClipboardDocumentIcon
  },
  {
    name: 'Expert Feedback and Analysis',
    description:
      'Practice Med offers in-depth evaluations and insights on student performance in practice tests. By pinpointing their strong and weak points, learners can devise a tailored study strategy that focuses on enhancing their areas in need of growth.',
    icon: ClipboardDocumentListIcon
  }
  // {
  //   name: 'Affordable and Convenient',
  //   description:
  //     'Practice Med is affordable and can be accessed online from anywhere, anytime. This makes it easy for students to fit test preparation into their busy schedules, and ensure they are fully prepared for their medical exams.',
  //   icon: CurrencyDollarIcon
  // }
]
const shortPlans = computed(() => [plans.value[2], plans.value[1]])
const faqs = [
  {
    question: 'What is the AMC MCQ Exam?',
    answer:
      "The AMC MCQ Exam is a multiple-choice examination for medical graduates who want to practice medicine in countries like Australia, New Zealand, and the UK. It assesses the candidate's knowledge, clinical reasoning, and problem-solving skills to ensure they meet the required standards for safe and effective practice."
  },
  {
    question: 'How does Practice Med help me prepare for the AMC MCQ Exam?',
    answer:
      'Practice Med offers a subscription-based service where you can access practice tests and receive valuable feedback on your performance, including your overall score, timing, and areas of strength and weakness. This helps you to identify areas for improvement and tailor your study plan accordingly.'
  },
  {
    question: 'What is the pricing structure for Practice Med?',
    answer:
      'Our service is subscription-based, with users paying a monthly fee to access a specific number of practice tests. The exact pricing and number of tests available may vary depending on the subscription plan chosen by you.'
  },
  {
    question: 'How does the platform provide meaningful feedback?',
    answer:
      'Once you complete a practice test, the platform generates a detailed report that includes your overall score, timing, and performance in various categories. This feedback helps you understand your strengths and weaknesses and guides you in focusing your preparation efforts.'
  },
  {
    question:
      'Can I use Practice Med if I am not from Australia, New Zealand, or the UK?',
    answer:
      'Yes, our platform is designed for people from any country who are preparing for the AMC MCQ Exam to work as registered doctors in Australia, New Zealand, or the UK. As long as you meet the eligibility criteria for the exam, you can use the platform to help you prepare.'
  },
  {
    question: 'How often are the practice tests updated?',
    answer:
      "The practice tests are regularly updated to ensure they remain relevant and aligned with the latest changes in the AMC MCQ Exam's content and format. This ensures that you are always practicing with the most up-to-date material."
  },
  {
    question:
      'Is there any limit to the number of times I can take a practice test?',
    answer:
      'The number of practice tests you can take depends on the subscription plan you choose. Each plan allows for a certain number of tests to be taken within the subscription period. Once you have used up your allotted tests, you may need to upgrade your plan or wait for the next subscription period to access more tests.'
  }
]
</script>
