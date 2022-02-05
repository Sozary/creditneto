export const state = () => ({
  amount: null,
  duration: null,
  sort: null,
})
export const mutations = {
  updateSort(state, payload) {
    state.sort = payload
  },
  updateAmount(state, payload) {
    state.amount = payload
  },
  updateDuration(state, payload) {
    state.duration = payload
  },
}
export const getters = {
  getSort(state) {
    return state.sort
  },
  getAmount(state) {
    return state.amount
  },
  getDuration(state) {
    return state.duration
  },
}
