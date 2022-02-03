<template>
  <div class="c-loan">
    <span class="c-loan-title"> Annonces: </span>
    <div class="c-loan-items">
      <Loader
        v-for="(type, index) in [active, others]"
        :key="index"
        :max-items="5"
        :show-range="5"
        custom-class="c-loan-items-item"
        :items="type"
      >
        <template v-slot:default="{ item }">
          <img :src="'/assets' + item.url_logo" />
          <div class="c-loan-items-item-taeg">
            <span>
              <strong>TAEG </strong> de
              <strong>{{ taeg(item.taeg)[0] }}</strong> à
              <strong>{{ taeg(item.taeg)[0] }}</strong></span
            >
          </div>
          <div class="c-loan-items-item-example">
            <span v-html="item.exemple" />
          </div>
          <div class="c-loan-items-item-options">
            <font-awesome-icon :icon="['fas', 'euro-sign']" />
            <font-awesome-icon :icon="['fas', 'calendar']" />
          </div>
          <div class="c-loan-items-item-data-options">
            <div class="c-loan-items-item-data-options-amount">
              <span>Montant : Min </span
              ><span v-html="formatCurrency(item.montant_min)" />
              <span> - Max </span
              ><span v-html="formatCurrency(item.montant_max)" />
            </div>
            <div class="c-loan-items-item-data-options-duration">
              <span>Durée : Min </span
              ><span v-html="item.duree_min + ' mois'" /><span> - Max </span
              ><span v-html="item.duree_max + ' mois'" />
            </div>
          </div>
          <div class="c-loan-items-item-simulate">
            <span>simuler</span>
          </div>
        </template>
        <template v-slot:no-data v-if="![active, others][index].length">
          <span class="c-loan-others"> Aucune offre disponible </span>
        </template>
        <template v-slot:footer v-if="index === 0">
          <span class="c-loan-others"> Autre crédits disponibles: </span>
        </template>
      </Loader>
    </div>
  </div>
</template>
<script>
import Loader from '~/components/loader.vue'
export default {
  components: { Loader },
  async mounted() {
    const active = await this.$axios.$get('', {
      params: {
        product: this.categories.find((c) => c.slug === this.selectedNav).label,
        filters: {
          active: 1,
        },
      },
    })
    const others = await this.$axios.$get('', {
      params: {
        product: this.categories.find((c) => c.slug === this.selectedNav).label,
        filters: {},
      },
    })
    if (active.status === 200) {
      this.active = active.data
    }
    if (others.status === 200) {
      this.others = others.data
    }
  },
  methods: {
    taeg(value) {
      return value.split(' &agrave; ')
    },
    formatCurrency(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '€'
    },
  },
  data() {
    return { active: [], others: [] }
  },
  computed: {
    categories() {
      return this.$store.getters['nav/categories']
    },
    selectedNav() {
      return this.$store.getters['nav/selectedNav']
    },
  },
}
</script>
