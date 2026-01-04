// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  vue: {
    vueFeatures: {
      macros: {
        defineProps: true,
        defineEmits: true,
        defineModel: true  // Разрешить макрос defineModel
      }
    }
  },

  rules: {
    "vue/html-self-closing": "off"
  }
});
