<template>
  <div class="c-loan">
    <span class="c-loan-title"> Annonces: </span>
    <div class="c-loan-items">
      <Loader
        v-for="(type, index) in [active, others]"
        :key="index"
        :max-items="3"
        :show-range="3"
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
            <span @click="track(item.partenaire)">simuler</span>
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
    track(partner) {
      if (process.client) {
        var _gaq = _gaq || []
        _gaq.push(['_setAccount', 'UA-219885464-1'])
        _gaq.push(['_trackPageview'])
        _gaq.push([
          '_addTrans',
          '1234', // order ID - required
          'Provenance', // affiliation or store name
          '1.00', // total - required
          '0', // tax
          '0', // shipping
          'Ville', // city
          'Departement', // state or province
          'FR', // country
        ])

        _gaq.push([
          '_addItem',
          '1234', // order ID - required
          'DD44', // SKU/code - required
          'CREDIT', // product name
          'COFIDIS', // category or variation
          '1.00', // unit price - required
          '1', // quantity - required
        ])
        _gaq.push(['_trackTrans'])(
          //submits transaction to the Analytics servers
          function () {
            var ga = document.createElement('script')
            ga.type = 'text/javascript'
            ga.async = true
            ga.src =
              ('https:' == document.location.protocol
                ? 'https://ssl'
                : '//www') + '.google-analytics.com/ga.js'
            var s = document.getElementsByTagName('script')[0]
            s.parentNode.insertBefore(ga, s)
          }
        )()
      }
      this.$ga.event({
        hitType: 'event',
        eventCategory: 'loan',
        eventAction: 'click-loan',
        eventLabel: partner,
      })
    },
    async fetchOffers() {
      const productLabel = this.categories.find(
        (c) => c.slug === this.selectedNav
      )
      if (!productLabel) {
        this.$router.push('/')
        this.$store.commit('nav/updateSelectedNav', '')
        return
      }
      const params = {
        product: productLabel.label,
        filters: {
          active: { operator: '=', value: 1 },
          montant_min: { operator: '<=', value: this.amount },
          montant_max: { operator: '>=', value: this.amount },
          duree_min: { operator: '<=', value: this.duration },
          duree_max: { operator: '>=', value: this.duration },
        },
      }

      const active = await this.$axios.$post(
        window.location.origin + '/.netlify/functions/api',
        params
      )

      params.filters.active.value = 0
      const others = await this.$axios.$post(
        window.location.origin + '/.netlify/functions/api',
        params
      )

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
    }, 500),
    duration: debounce(function () {
      this.fetchOffers()
    }, 500),
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
