<script setup lang="ts">
const route = useRoute();

const id = ref(route.params.id);
</script>
<template>
  <div>
    catalog ID: {{ id }}
  </div>
</template>