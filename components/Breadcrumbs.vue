<template>
  <UBreadcrumb :items="items" />
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
