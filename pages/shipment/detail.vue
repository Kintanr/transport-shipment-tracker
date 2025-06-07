<template>
  <div class="lg:px-15 px-10 py-5">
    <Breadcrumbs :items="breadcrumbsItem" />
    <div class="mt-10 lg:mx-40 md:mx-10 mx-5">
      <div class="font-bold text-2xl">Shipment Detail</div>
      <div class="grid grid-cols-3 gap-6 mt-7">
        <div
          class="rounded-xl p-5 bg-orange-500 col-span-3 md:col-span-1 text-white"
        >
          <div>
            <span class="flex gap-4 font-bold items-center">
              <UIcon name="i-tabler-truck-delivery" class="text-2xl" />
              <span class="text-lg">{{ selectedShipment?.id }}</span>
            </span>

            <div class="">
              <UStepper
                color="white"
                size="xs"
                disabled
                :defaultValue="2"
                :items="[
                  { title: selectedShipment?.origin, icon: '' },
                  {
                    title: selectedShipment?.destination,
                    icon: 'i-map-map-pin',
                  },
                ]"
                orientation="vertical"
                class="w-full mt-5"
              >
                <template #indicator="{ item }">
                  <div
                    v-if="item?.icon"
                    class="relative flex items-center justify-center size-full text-orange-500"
                  >
                    <UIcon :name="item?.icon" class="text-xs" />
                  </div>
                  <div v-else></div>
                </template>

                <template #title="{ item }">
                  <div class="text-white">
                    {{ item?.title }}
                  </div>
                </template>
                <template #description>
                  <div class="my-5"></div>
                </template>
              </UStepper>
            </div>
          </div>
        </div>

        <div class="col-span-3 md:col-span-2">
          <div class="rounded-xl p-5 bg-gray-100 w-full">
            <span
              v-if="selectedShipment?.status == 'Assigned'"
              class="font-bold"
              >{{ selectedTransporter?.name }}</span
            >
            <UBadge v-else color="error" variant="outline">{{
              selectedShipment?.status
            }}</UBadge>

            <div class="grid grid-cols-2 items-center">
              <img
                v-if="selectedShipment?.status == 'Assigned'"
                :src="selectedTransporter?.image"
                width="200"
              />
              <img v-else src="/images/truck.png" width="200" />

              <div
                class="flex flex-col gap-5"
                v-if="selectedShipment?.status == 'Assigned'"
              >
                <div class="flex items-center gap-3">
                  <span class="rounded-xl bg-orange-500 py-1 px-3">
                    <UIcon
                      name="i-ph-package-thin"
                      class="text-4xl text-white"
                    />
                  </span>
                  <div>
                    <div class="font-semibold text-md">
                      {{ selectedTransporter?.load_capacity }}
                    </div>
                    <div class="text-gray-700 text-sm">Load Capacity</div>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <span class="rounded-xl bg-orange-500 py-1 px-3">
                    <UIcon
                      name="i-streamline-transfer-truck-time-remix"
                      class="text-4xl text-white"
                    />
                  </span>
                  <div>
                    <div class="font-semibold text-md">
                      {{
                        selectedTransporter?.capacity == null
                          ? "-"
                          : selectedTransporter?.capacity + "/hari"
                      }}
                    </div>
                    <div class="text-gray-700 text-sm">Delivery Time</div>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <span class="rounded-xl bg-orange-500 py-1 px-3">
                    <UIcon name="i-gis-route" class="text-4xl text-white" />
                  </span>
                  <div>
                    <div class="font-semibold text-md">
                      <template v-if="selectedTransporter?.area.length">
                        <span
                          v-for="(area, key) in selectedTransporter?.area"
                          :key="key"
                        >
                          {{
                            key == selectedTransporter?.area.length - 1
                              ? area
                              : area + " - "
                          }}
                        </span>
                      </template>
                      <template v-else>-</template>
                    </div>
                    <div class="text-gray-700 text-sm">Delivery Area</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShipmentStore } from "@/stores/shipment";
import { useRouter } from "vue-router";

const breadcrumbsItem = [
  { label: "", to: "/", icon: "i-lucide-house" },
  { label: "Shipment", to: "/shipment", icon: "" },
  { label: "Shipment Detail", to: "/shipment/detail", icon: "" },
];

const shipment = useShipmentStore();

let selectedShipment = shipment.currentShipment;
let selectedTransporter = shipment.currentTransporter;

const router = useRouter();

onMounted(() => {
  if (!selectedShipment.id) {
    router.push("/shipment");
  }
});
</script>