<template>
  <div class="px-15 py-5">
    <Breadcrumbs :items="breadcrumbsItem" />

    <div class="mt-10">
      <div class="font-bold text-2xl">Shipments ({{ allData.length }})</div>

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-4">
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
            Last update 06-06-2025 19:20
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

          <NuxtLink to="/shipment/detail">
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
import { ref, onMounted, computed, watch } from "vue";

import transporter from "~/data/transporter.json";

const breadcrumbsItem = [
  { label: "", to: "/", icon: "i-lucide-house" },
  { label: "Shipment", to: "/shipment", icon: "" },
];

interface data {
  id: string;
  origin: string;
  date: string;
  destination: string;
  status: string;
  transporter_id: string;
  transporter: string;
}

let allData = ref<data[]>([]);
const status = ["Assigned", "Not Assigned"];
const destination = [
  "Jakarta",
  "Surabaya",
  "Semarang",
  "Denpasar",
  "Jambi",
  "Medan",
];

onMounted(() => {
  generateRandomData();
});

const itemsPerPage = 12;
let currentPage = ref(1);

let paginatedData = computed(() => {
  let start = (currentPage.value - 1) * itemsPerPage;
  return allData.value.slice(start, start + itemsPerPage);
});

// function to automatically generate data
function generateRandomData() {
  let current_transporter: any = ref(null);

  // looping insert data
  for (let index = 0; index < 16; index++) {
    // set date for each data
    let date = getRandomDate(new Date("2025-06-06"), new Date("2025-06-08"));

    // get random transporter from json data
    current_transporter = transporter[Math.floor(Math.random() * 8)] ?? null;

    // get the capacity for validation each date
    let transporter_capacity =
      current_transporter != null ? Number(current_transporter.capacity) : 0;

    // validity availability transporter
    if (transporter_capacity != 0) {
      // check data length in the same date using transporter id
      if (
        transporter_capacity >
        allData.value.filter(
          (v: any) =>
            v.transporter_id === current_transporter?.id &&
            new Date(v.date).getTime() === new Date(date).getTime()
        ).length
      ) {
        // if no more capacity, set null in current transporter
        current_transporter = null;
      }
    }

    // finalisation to push data
    allData.value.push({
      id: Math.random().toString(36).substr(2, 9),
      transporter_id: current_transporter?.id ?? null,
      transporter: current_transporter?.name ?? null,
      origin: destination[Math.floor(Math.random() * 6)],
      destination: destination[Math.floor(Math.random() * 6)],
      date: date,
      status: current_transporter?.id ? status[0] : status[1],
    });
  }
}

// function to generate random date from start to end
function getRandomDate(start: Date, end: Date) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime).toISOString().split("T")[0];
}
</script>
