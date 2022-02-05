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
              <strong>{{ taeg(item.taeg)[1] }}</strong></span
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
import { debounce } from 'debounce'
import Loader from '~/components/loader.vue'
export default {
  components: { Loader },
  async mounted() {
    await this.fetchOffers()
  },
  methods: {
    async fetchOffers() {
      const params = {
        product: this.categories.find((c) => c.slug === this.selectedNav).label,
        filters: {
          active: { operator: '=', value: 1 },
          montant_min: { operator: '<=', value: this.amount },
          montant_max: { operator: '>=', value: this.amount },
          duree_min: { operator: '<=', value: this.duration },
          duree_max: { operator: '>=', value: this.duration },
        },
      }

      const active = await this.$axios.$post('', params)

      params.filters.active.value = 0
      const others = await this.$axios.$post('', params)

      if (active.status === 200) {
        this.active = active.data
      }
      if (others.status === 200) {
        this.others = others.data
      }
    },
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
  watch: {
    amount: debounce(function () {
      this.fetchOffers()
    }, 100),
    duration: debounce(function () {
      this.fetchOffers()
    }, 100),
    sort() {
      this.active = this.sort.sortFn(this.active)
      this.others = this.sort.sortFn(this.others)
    },
  },
  computed: {
    amount() {
      return this.$store.getters['options/getAmount']
    },
    sort() {
      return this.$store.getters['options/getSort']
    },
    duration() {
      return this.$store.getters['options/getDuration']
    },
    categories() {
      return this.$store.getters['nav/categories']
    },
    selectedNav() {
      return this.$store.getters['nav/selectedNav']
    },
  },
}
</script>
