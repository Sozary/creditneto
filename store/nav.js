export const state = () => ({
  selected: '',
  showMenu: false,
  showCalculate: false,
  categories: [
    {
      label: 'Prêt Personnel',
      id: 'pret-personnel',
      visible: true,
      id_produit: 4,
    },
    {
      label: 'Rachat de Crédit',
      id: 'rachat-de-credit',
      visible: true,
      id_produit: 6,
    },
    {
      label: 'Crédit Renouvelable',
      id: 'credit-renouvelable',
      visible: true,
      id_produit: 5,
    },
    { label: 'Prêt Travaux', id: 'pret-travaux', visible: true, id_produit: 2 },
    {
      label: 'Crédit Immobilier',
      id: 'credit-immobilier',
      visible: true,
      id_produit: 7,
    },
    { label: 'Crédit Auto', id: 'credit-auto', visible: true, id_produit: 4 },
    { label: 'Crédit Moto', id: 'credit-moto', visible: true, id_produit: 4 },
    {
      label: 'Crédit Bateau',
      id: 'credit-bateau',
      visible: false,
      id_produit: 11,
    },
    {
      label: 'Crédit Camping Car',
      id: 'credit-camping-car',
      visible: false,
      id_produit: 9,
    },
    {
      label: 'Crédit Entre Particuliers',
      id: 'credit-entre-particuliers',
      visible: true,
    },
    { label: 'Crédit Consommation', id: 'credit-consommation', visible: true },
    {
      label: 'Compte / Carte Bancaire',
      id: 'compte-carte-bancaire',
      visible: true,
    },
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
        visible: e.visible,
        id_produit: e.id_produit,
      }
    })
  },
}
