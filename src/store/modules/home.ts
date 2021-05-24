export default {
  namespaced: true,
  state: () => ({
    count: 0
  }),
  mutations: {
    inc: (state: { count: number; }) => state.count++
  },
  actions: {
    inc: ({ commit }) => commit('inc')
  }
}
