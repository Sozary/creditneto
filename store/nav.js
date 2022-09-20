export const state = () => ({
  selected: '',
  showMenu: false,
  showCalculate: false,
  categories: [
    {
      label: 'Prêt Personnel',
      database: 'Pret Personnel',
      id: 'pret-personnel',
      visible: true,
      id_produit: 4,
    },
    {
      label: 'Rachat de Crédit',
      database: 'Rachat Credit',
      id: 'rachat-de-credit',
      visible: true,
      id_produit: 6,
    },
    {
      label: 'Crédit Renouvelable',
      database: 'Credit Renouvelable',
      id: 'credit-renouvelable',
      visible: true,
      id_produit: 5,
    },
    {
      label: 'Prêt Travaux',
      database: 'Pret Travaux',
      id: 'pret-travaux',
      visible: true,
      id_produit: 2,
    },
    {
      database: 'Credit Immobilier',
      label: 'Crédit Immobilier',
      id: 'credit-immobilier',
      visible: true,
      id_produit: 7,
    },
    {
      label: 'Crédit Auto',
      database: 'Credit Auto',
      id: 'credit-auto',
      visible: true,
      id_produit: 4,
    },
    {
      label: 'Crédit Moto',
      id: 'credit-moto',
      database: 'Credit Auto',
      visible: true,
      id_produit: 4,
    },
    {
      database: 'Credit Bateau',
      label: 'Crédit Bateau',
      id: 'credit-bateau',
      visible: false,
      id_produit: 11,
    },
    {
      database: 'Credit Camping Car',
      label: 'Crédit Camping Car',
      id: 'credit-camping-car',
      visible: false,
      id_produit: 9,
    },
    {
      label: 'Crédit Entre Particuliers',
      database: 'Credit Entre Particuliers',
      id: 'credit-entre-particuliers',
      visible: true,
    },
    {
      label: 'Crédit Consommation',
      database: 'Credit Consommation',
      id: 'credit-consommation',
      visible: true,
    },
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
        database: e.database,
        visible: e.visible,
        id_produit: e.id_produit,
      }
    })
  },
}
