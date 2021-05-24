import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('../components/Home.vue')},
  { path: '/item/:id', component: () => import('../components/Item.vue'), name: 'item' }
]

export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}

