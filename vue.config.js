const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack"); // Импортируем webpack для использования DefinePlugin

module.exports = defineConfig({
  transpileDependencies: true,

  // Добавляем настройку configureWebpack
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // или true, если нужно включить
      }),
    ],
  },

  // Добавляем настройку для автоматического импорта SCSS
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       additionalData: `@import "@/assets/styles/main.scss";`,
  //     },
  //   },
  // },
});
