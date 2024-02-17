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
          <div class="mb-3">
            <div class="relative mx-auto">
              <img
                :alt="slotProps.data.id"
                :src="slotProps.data.thumbnails[0].url"
                class="w-full border-round"
              />
              <!--              <Tag-->
              <!--                :severity="getSeverity(slotProps.data.inventoryStatus)"-->
              <!--                :value="slotProps.data.inventoryStatus"-->
              <!--                class="absolute"-->
              <!--                style="left: 5px; top: 5px"-->
              <!--              />-->
            </div>
          </div>
          <div class="mb-3 font-medium">{{ slotProps.data.title }}</div>
          <div class="flex justify-content-between align-items-center">
            <div class="mt-0 font-semibold text-sm">
              ${{ slotProps.data.description }}
            </div>
            <span>
              <Button icon="pi pi-heart" outlined severity="secondary" />
              <Button class="ml-2" icon="pi pi-shopping-cart" />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script lang="ts" setup>
import { useMediaStore } from "../../src/store/media";

const mediaStore = useMediaStore();

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

// const getSeverity = (status) => {
//   switch (status) {
//     case "INSTOCK":
//       return "success";
//
//     case "LOWSTOCK":
//       return "warning";
//
//     case "OUTOFSTOCK":
//       return "danger";
//
//     default:
//       return null;
//   }
// };
</script>
