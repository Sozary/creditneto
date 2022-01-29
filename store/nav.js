export const state = () => ({
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

export const getters = {
  categories(state) {
    return state.categories.map((e) => {
      return {
        label: e,
        link: e.toLowerCase().split(' ').join('-'),
      }
    })
  },
}
