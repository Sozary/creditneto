export const state = () => ({
  amount: null,
  duration: null,
  sort: null,
  amountMax: 200000,
  amountMin: 0,
  durationMax: 120,
  durationMin: 6,
  userInteraction: false,
  resetFilter: '',
  updateLimits: false,
  trueDisplay: false,
  pass: false,
})
export const mutations = {
  updateResetFilter(state, value) {
    state.resetFilter = value
  },
  updateTrueDisplay(state, value) {
    state.trueDisplay = value
  },
  updatePass(state, value) {
    state.pass = value
  },
  updateLimits(state, value) {
    state.updateLimits = value
  },
  updateUserInteraction(state, payload) {
    state.userInteraction = payload.userInteraction
  },
  updateAmountLimits(state, payload) {
    state.amountMax = payload.amountMax
    state.amountMin = payload.amountMin
  },
  updateDurationLimits(state, payload) {
    state.durationMax = payload.durationMax
    state.durationMin = payload.durationMin
  },
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
  getResetFilter(state) {
    return state.resetFilter
  },
  getTrueDisplay(state) {
    return state.trueDisplay
  },
  getUpdateLimits(state) {
    return state.updateLimits
  },
  getUserInteraction(state) {
    return state.userInteraction
  },
  getAmountMin(state) {
    return state.amountMin
  },
  getPass(state) {
    return state.pass
  },
  getAmountMax(state) {
    return state.amountMax
  },
  getDurationMin(state) {
    return state.durationMin
  },
  getDurationMax(state) {
    return state.durationMax
  },
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
