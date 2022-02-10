export const state = () => ({
  selected: 'credit-auto',
  showMenu: false,
  showCalculate: false,
  categories: [
    'Pret Personnel',
    'Rachat Credit',
    'Credit Renouvelable',
    'Pret Travaux',
    'Credit Immobilier',
    'Credit Auto - Moto',
    'Credit Entre Particuliers',
    'Credit Consommation',
    'Compte - Carte Bancaire',
  ],
})
export const mutations = {
  updateShowMenu(state, payload) {
    state.showMenu = payload
  },
  updateShowCalculate(state, payload) {
    state.showCalculate = payload
  },
  updateSelectedNav(state, payload) {
    state.selected = payload
  },
}
export const getters = {
  showCalculate(state) {
    return state.showCalculate
  },
  showMenu(state) {
    return state.showMenu
  },
  selectedNav(state) {
    return state.selected
  },
  categories(state) {
    return state.categories.map((e) => {
      return {
        label: e,
        slug: e.toLowerCase().split(' ').join('-'),
      }
    })
  },
}
