import { defineConfig } from "vite";
const vuePlugin = require("@vitejs/plugin-vue");
const vueJsx = require("@vitejs/plugin-vue-jsx");
export default defineConfig({
  plugins: [
      vuePlugin(),
      vueJsx()
  ],
  build: {
    minify: false
  }
})
