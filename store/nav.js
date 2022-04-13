export const state = () => ({
  selected: '',
  showMenu: false,
  showCalculate: false,
  categories: [
    { label: 'Prêt Personnel', id: 'pret-personnel' },
    { label: 'Rachat de Crédit', id: 'rachat-de-credit' },
    { label: 'Crédit Renouvelable', id: 'credit-renouvelable' },
    { label: 'Prêt Travaux', id: 'pret-travaux' },
    { label: 'Crédit Immobilier', id: 'credit-immobilier' },
    { label: 'Crédit Auto', id: 'credit-auto' },
    { label: 'Crédit Moto', id: 'credit-moto' },
    { label: 'Crédit Entre Particuliers', id: 'credit-entre-particuliers' },
    { label: 'Crédit Consommation', id: 'credit-consommation' },
    { label: 'Compte / Carte Bancaire', id: 'compte-carte-bancaire' },
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
    state.selected = payload.replace(/\//g, '')
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
        label: e.label,
        slug: e.id,
      }
    })
  },
}
