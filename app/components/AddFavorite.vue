<script setup lang="ts">
const { id, isShown } = defineProps<{
  id: number;
  isShown: boolean;
}>();
</script>

<template>
  <button
    class="fav-button"
  >
    <Icon name="icons:favorite-add" size="18px" />
  </button>
</template>

<style scoped>
.fav-button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>