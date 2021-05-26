import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { createStore } from './store'
import { setupGlobDirectives } from '@/directives'

export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  const store = createStore()

  app.use(router)
  app.use(store)

  setupGlobDirectives(app)
  return {
    app,
    router,
    store
  }
}
