import { createStore as _createStore } from 'vuex'
import home from './modules/home'

export function createStore() {
  return _createStore({
    modules: {
      home
    }
  })
}
