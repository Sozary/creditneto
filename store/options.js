export const state = () => ({
  amount: null,
  duration: null,
})
export const mutations = {
  updateAmount(state, payload) {
    state.amount = payload
  },
  updateDuration(state, payload) {
    state.duration = payload
  },
}
export const getters = {
  getAmount(state) {
    return state.amount
  },
  getDuration(state) {
    return state.duration
  },
}
