<template>
  <div class="app">
    <div class="controls">
      <button @click="createPolygons">Создать</button>
      <button @click="savePolygons">Сохранить</button>
      <button @click="clearPolygons">Сбросить</button>
    </div>
    <div class="zones">
      <div class="buffer-zone">
        <h3>Буферная зона</h3>
        <svg class="svg-container" @drop="onDrop('buffer')" @dragover.prevent>
          <polygon
            v-for="polygon in bufferPolygons"
            :key="polygon.id"
            :points="polygon.points"
            :fill="polygon.color"
            @mousedown="startDrag(polygon, 'buffer')"
            @mouseup="stopDrag"
          />
        </svg>
      </div>
      <div
        class="work-zone"
        @wheel="scaleWorkZone"
        @drop="onDrop('work')"
        @dragover.prevent
        @mousemove="updateMousePosition"
        @mousedown="startPan"
        @mouseup="stopPan"
        @mouseleave="stopPan"
      >
        <h3>Рабочая зона</h3>
        <div class="scale">
          <span>Масштаб: {{ scale.toFixed(2) }}</span>
          <span>X: {{ mouseX }}</span>
          <span>Y: {{ mouseY }}</span>
        </div>
        <svg
          class="svg-container"
          :style="{
            transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
          }"
        >
          <g class="grid">
            <line
              v-for="n in 20"
              :key="'x' + n"
              :x1="n * 50"
              :y1="0"
              :x2="n * 50"
              :y2="1000"
              stroke="lightgray"
            />
            <line
              v-for="n in 20"
              :key="'y' + n"
              :x1="0"
              :y1="n * 50"
              :x2="1000"
              :y2="n * 50"
              stroke="lightgray"
            />
            <text
              v-for="n in 20"
              :key="'xlabel' + n"
              :x="n * 50"
              :y="10"
              fill="gray"
              font-size="10"
            >
              {{ n * 50 }}
            </text>
            <text
              v-for="n in 20"
              :key="'ylabel' + n"
              :x="10"
              :y="n * 50"
              fill="gray"
              font-size="10"
            >
              {{ n * 50 }}
            </text>
          </g>
          <polygon
            v-for="polygon in workPolygons"
            :key="polygon.id"
            :points="polygon.points"
            :fill="polygon.color"
            @mousedown="startDrag(polygon, 'work')"
            @mouseup="stopDrag"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";

// Состояние приложения
const bufferPolygons = reactive([]);
const workPolygons = reactive([]);
const scale = ref(1);
const mouseX = ref(0);
const mouseY = ref(0);
const panX = ref(0);
const panY = ref(0);
let isPanning = false;
let draggedPolygon = null;
let draggedFrom = null;

// Загрузка сохраненных данных
onMounted(() => {
  const savedPolygons = localStorage.getItem("workPolygons");
  if (savedPolygons) {
    workPolygons.push(...JSON.parse(savedPolygons));
  }
});

// Создание случайных полигонов
const createPolygons = () => {
  const count = Math.floor(Math.random() * 16) + 5; // От 5 до 20 полигонов
  for (let i = 0; i < count; i++) {
    const id = Date.now() + i;
    const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    const vertices = Math.floor(Math.random() * 8) + 3; // От 3 до 10 вершин
    const points = generatePolygonPoints(vertices);
    bufferPolygons.push({ id, color, points });
  }
};

// Генерация точек для полигона
const generatePolygonPoints = (vertices) => {
  const points = [];
  const radius = 50;
  const centerX = Math.random() * 200; // Случайное расположение по X
  const centerY = Math.random() * 200; // Случайное расположение по Y
  for (let i = 0; i < vertices; i++) {
    const angle = (i / vertices) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return points.join(" ");
};

// Сохранение полигонов в localStorage
const savePolygons = () => {
  localStorage.setItem("workPolygons", JSON.stringify(workPolygons));
};

// Очистка данных
const clearPolygons = () => {
  bufferPolygons.length = 0;
  workPolygons.length = 0;
  localStorage.removeItem("workPolygons");
};

// Масштабирование рабочей зоны
const scaleWorkZone = (event) => {
  event.preventDefault();
  scale.value += event.deltaY * -0.001;
  scale.value = Math.min(Math.max(0.5, scale.value), 2);
};

// Перетаскивание
const startDrag = (polygon, from) => {
  draggedPolygon = polygon;
  draggedFrom = from;
};

const stopDrag = () => {
  draggedPolygon = null;
  draggedFrom = null;
};

const onDrop = (to) => {
  if (draggedPolygon) {
    if (draggedFrom === "buffer" && to === "work") {
      workPolygons.push(draggedPolygon);
      bufferPolygons.splice(bufferPolygons.indexOf(draggedPolygon), 1);
    } else if (draggedFrom === "work" && to === "buffer") {
      bufferPolygons.push(draggedPolygon);
      workPolygons.splice(workPolygons.indexOf(draggedPolygon), 1);
    }
    draggedPolygon = null;
    draggedFrom = null;
  }
};

// Прокрутка (панорамирование)
const startPan = (event) => {
  if (event.button === 0) {
    isPanning = true;
  }
};

const stopPan = () => {
  isPanning = false;
};

const updateMousePosition = (event) => {
  mouseX.value = event.offsetX;
  mouseY.value = event.offsetY;
  if (isPanning) {
    panX.value += event.movementX;
    panY.value += event.movementY;
  }
};
</script>

<style>
body {
  background-color: #ccc;
}

.app {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
}

.controls button {
  margin-right: 10px;
}

.zones {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.buffer-zone,
.work-zone {
  border: 1px solid #999;
  padding: 10px;
  flex: 1;
  /* min-height: 300px; */
  position: relative;
  overflow: hidden;
}

.svg-container {
  /* position: absolute; */
  /* z-index: -1; */
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.polygon {
  cursor: grab;
}

.scale {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 5px;
  border-radius: 5px;
}

.grid line {
  stroke: lightgray;
  stroke-width: 0.5;
}

.grid text {
  user-select: none;
}
</style>
