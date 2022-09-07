export const state = () => ({
  loans: null,
})

export const mutations = {
  updateLoans(state, loans) {
    state.loans = loans
  },
}
export const getters = {
  getLoans(state) {
    return state.loans
  },
}
export const actions = {
  updateLoans({ commit }, loans) {
    commit('updateLoans', loans)
  },
}
