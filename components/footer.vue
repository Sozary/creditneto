<template>
  <div class="c-footer">
    <img src="/assets/images/logo.png" class="c-footer-logo" />
    <span class="c-footer-copyright"
      >Copyright 2004-{{ year }} - Site édité par la société BLOGGERS VIRTUAL
      WEB SL</span
    >
    <div
      :class="'c-footer-nav-' + (index + 1)"
      v-for="(category, index) in categories"
      :key="index"
    >
      <span v-html="category[0].label" v-if="category[0]" /> <br />
      <span v-html="category[1].label" v-if="category[1]" />
    </div>
    <span
      :class="'c-footer-country-' + country.id"
      v-for="country in countries"
      :key="country.id"
      v-html="'Creditneto ' + country.label"
    ></span>
    <span class="c-footer-contact"
      >Contact - Mentions legales - Adresses de nos partenaires</span
    >
    <p class="c-footer-pre-info">
      Vous avez besoin d'argent rapidement ? <br />Demande et simulation de
      crédit !
    </p>
    <p class="c-footer-info-1">
      Creditneto vous proposes des offres de crédits et de prêts bancaires
      sélectionnés auprès de très grands organismes de crédits avec des formules
      variées. Simulation, recherche et demande de crédit en ligne. Vous pouvez
      avoir le crédit qui correspond parfaitement à votre recherche de crédit
      pas cher !
    </p>

    <div class="c-footer-network">
      <font-awesome-icon :icon="['fab', 'facebook']" />
      <font-awesome-icon :icon="['fab', 'twitter']" />
    </div>
    <p class="c-footer-info-2">
      Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de
      remboursement avant de vous engager. <br />
      <br />
      *Voir les conditions financières sur les sites de nos partenaires.
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      countries: [
        { label: 'Belgique', id: 'belgium' },
        { label: 'Pays Bas', id: 'netherlands' },
        { label: 'France', id: 'france' },
      ],
    }
  },
  methods: {
    chunk(list, size) {
      for (var position, i = 0, chunk = -1, chunks = []; i < list.length; i++) {
        if ((position = i % size)) {
          chunks[chunk][position] = list[i]
        } else {
          chunk++
          chunks[chunk] = [list[i]]
        }
      }
      return chunks
    },
  },
  computed: {
    categories() {
      return this.chunk(this.$store.getters['nav/categories'], 2)
    },
    year() {
      return new Date().getFullYear()
    },
    showMenu() {
      return this.$store.getters['nav/showMenu']
    },
    showCalculate() {
      return this.$store.getters['nav/showCalculate']
    },
  },
}
</script>
