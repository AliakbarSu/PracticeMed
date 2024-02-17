<template>
  <div class="card">
    <div v-if="!videos.length" class="p-4 pt-8 flex justify-center">
      <div class="text-gray-600">Sorry no video tutorials available!</div>
    </div>
    <Carousel
      v-else
      :num-scroll="1"
      :num-visible="3"
      :responsive-options="responsiveOptions"
      :value="videos"
    >
      <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2 p-3">
          <div class="mb-3" @click="view(slotProps.data.id)">
            <div class="relative mx-auto">
              <img
                :alt="slotProps.data.id"
                :src="slotProps.data.thumbnails[0].url"
                class="w-full border-round"
              />
              <Tag
                :severity="getSeverity('INSTOCK') as any"
                class="absolute"
                style="left: 5px; top: 5px"
                value="Trending"
              />
            </div>
          </div>
          <div class="mb-3 mt-10 font-medium">{{ slotProps.data.title }}</div>
          <div class="flex justify-content-between align-items-center">
            <div class="mt-0 font-semibold text-sm">
              {{ slotProps.data.description }}
            </div>
            <span>
              <Button icon="pi pi-heart" outlined severity="secondary" />
              <Button class="ml-2" icon="pi pi-shopping-cart" />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
    <Dialog
      v-model:visible="visible"
      :style="{ width: '25rem' }"
      header="You do not have access"
    >
      <span class="p-text-secondary block mb-5"
        >Please upgrade your plan to play this video.</span
      >
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { useMediaStore } from "store/media";
import { useAuthStore } from "store/auth";
import { signupWithPopup } from "auth/index";
import { usePlansStore } from "store/plans";

const mediaStore = useMediaStore();
const authStore = useAuthStore();
const plansStore = usePlansStore();
const router = useRouter();

const visible = ref(false);
const videos = computed(() => mediaStore.media);

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);

const view = async (id: string) => {
  if (!authStore.isAuthenticated) {
    try {
      await signupWithPopup();
    } catch (e) {
      console.error(e);
    }
    return;
  } else if (!plansStore.userHasActivePlan) {
    visible.value = true;
    return;
  } else {
    router.push(`/resources/videos/${id}`);
  }
};

const getSeverity = (status: string) => {
  switch (status) {
    case "INSTOCK":
      return "success";

    case "LOWSTOCK":
      return "warning";

    case "OUTOFSTOCK":
      return "danger";

    default:
      return null;
  }
};
</script>
