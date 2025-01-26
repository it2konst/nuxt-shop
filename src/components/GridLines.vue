<template>
  <svg class="grid-lines" :style="{ width: '100%', height: '100%' }">
    <defs>
      <pattern
        id="grid"
        :width="gridSize"
        :height="gridSize"
        patternUnits="userSpaceOnUse"
      >
        <path
          :d="`M ${gridSize} 0 L 0 0 0 ${gridSize}`"
          fill="none"
          stroke="gray"
          stroke-width="1"
        />
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
</template>

<script setup>
import { computed } from "vue";
import { useScale } from "../composables/useScale";

// Получаем текущий масштаб из родительского компонента
const { scale } = useScale();

// Вычисляем размер ячеек сетки в зависимости от масштаба
const gridSize = computed(() => 50 * scale.value);
</script>

<style scoped>
.grid-lines {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  /* transform-origin: left bottom; */
  transform: rotateX(-180deg);
}
</style>
