<template>
  <UBreadcrumb :items="items">
    <template #item="{ item }">
      <NuxtLink
        :to="item.to"
        class="flex"
        :class="[
          route.path === item.to
            ? 'text-orange-500 font-semibold'
            : 'text-gray-500 hover:text-gray-800',
          'transition-colors',
        ]"
      >
        <UIcon :name="item.icon" class="size-5" v-if="item.icon" />
        {{ item.label }}
      </NuxtLink>
    </template>
  </UBreadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

// using for check current route
const route = useRoute();

// define standard data
interface LinkItems {
  label: string;
  to: string;
  icon: string;
}

// get array from parent
const props = defineProps<{
  items: LinkItems[];
}>();
</script>
