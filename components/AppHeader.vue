<template>
  <div class="h-20 border-b-[2px] border-neutral-200">
    <div class="flex justify-between px-7 py-5">
      <!-- <div> -->
      <img src="/images/jeje-logo.png" class="object-cover" width="100" />
      <!-- </div> -->
      <div class="flex gap-4">
        <NuxtLink
          to="/"
          class="text-neutral-500"
          active-class="text-orange-500 font-bold"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/shipment"
          class="text-neutral-500"
          active-class="text-orange-500 font-bold"
        >
          Shipment
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

