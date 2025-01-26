// composables/useScale.js
import { ref } from "vue";

const scale = ref(1);

export function useScale() {
  return { scale };
}
