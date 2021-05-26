import { setupExpendClickDirective } from './expendClick'
import type { App } from 'vue'

export function setupGlobDirectives(app: App) {
  setupExpendClickDirective(app)
}
