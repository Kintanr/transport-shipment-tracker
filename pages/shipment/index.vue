<template>
  <div class="lg:px-15 px-10 py-5">
    <Breadcrumbs :items="breadcrumbsItem" />

    <div class="mt-10">
      <div class="font-bold text-2xl">Shipments ({{ allData.length }})</div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-7 gap-4">
        <UCard v-for="data in paginatedData" :key="data.id">
          <div class="flex justify-between flex-wrap">
            <span class="font-bold flex gap-4 items-center">
              <UIcon name="i-tabler-truck-delivery" class="text-2xl" />
              <span class="text-lg">{{ data.id }}</span>
            </span>
            <UBadge
              :color="data.status == 'Assigned' ? 'success' : 'error'"
              variant="outline"
              >{{ data.status }}</UBadge
            >
          </div>
          <div class="text-xs text-gray-500 mt-1.5">
            Last update {{ data.timestamp }}
          </div>

          <UStepper
            color="neutral"
            size="xs"
            disabled
            :defaultValue="2"
            :items="[
              { title: data.origin, icon: '' },
              { title: data.destination, icon: 'i-map-map-pin' },
            ]"
            class="w-full mt-6"
          >
            <template #indicator="{ item }">
              <div
                v-if="item?.icon"
                class="relative flex items-center justify-center size-full"
              >
                <UIcon :name="item?.icon" class="text-xs" />
              </div>
              <div v-else></div>
            </template>
          </UStepper>

          <NuxtLink
            to="/shipment/detail"
            @click="shipment.setCurrentShipment(data)"
          >
            <UButton color="primary" variant="outline" class="mt-5" block>
              Detail
            </UButton>
          </NuxtLink>
        </UCard>
      </div>

      <UPagination
        v-model:page="currentPage"
        :total="allData.length"
        :items-per-page="itemsPerPage"
        active-color="neutral"
        class="mt-7 justify-items-center"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { useShipmentStore } from "@/stores/shipment";

const breadcrumbsItem = [
  { label: "", to: "/", icon: "i-lucide-house" },
  { label: "Shipment", to: "/shipment", icon: "" },
];

const shipment = useShipmentStore();
let intervalId: ReturnType<typeof setInterval>;

onMounted(() => {
  shipment.generateRandomData();
  intervalId = setInterval(() => {
    shipment.statusUpdate();
  }, 30000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const allData = computed(() => shipment.allData || []);

const itemsPerPage = 12;
let currentPage = ref(1);

let paginatedData = computed(() => {
  let start = (currentPage.value - 1) * itemsPerPage;
  return allData.value.slice(start, start + itemsPerPage);
});
</script>
