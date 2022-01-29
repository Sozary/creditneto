export const state = () => ({
  selected: 'credit-auto',
  categories: [
    'Credit Auto',
    'Pret Personnel',
    'Credit Renouvelable',
    'Credit Immobilier',
    'Rachat de Credit',
    'Compte Bancaire',
    'Livret Epargne',
    'Generique',
    'Credit Consommation',
    'Credit Moto',
    'Pret Travaux',
  ],
})
export const mutations = {
  changeSelectedNav(state, payload) {
    state.selected = payload
  },
}
export const getters = {
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
