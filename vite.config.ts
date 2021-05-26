import { defineConfig } from 'vite'
import { resolve } from 'path'
const vuePlugin = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')

export const ssrTransformCustomDir = () => {
  return {
    props: [],
    needRuntime: true
  }
}

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vuePlugin({
      template: {
        ssr: true,
        compilerOptions: {
          directiveTransforms: {
            'expend-click': ssrTransformCustomDir
          }
        }
      }
    }),
    vueJsx()
  ],
  build: {
    minify: false
  }
})
