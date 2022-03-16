<template>
  <div class="c-loan">
    <div v-if="selectedNav === ''" class="c-loan-no-nav">
      <span class="c-loan-others"> Veuillez choisir un type de crédit </span>
    </div>
    <template v-else>
      <span class="c-loan-title"> Annonces: </span>
      <div class="c-loan-offers">
        <Loader
          v-for="(type, index) in [active, others]"
          mode="fit"
          :key="index"
          :loading="loading[['active', 'others'][index]]"
          custom-class-container="c-loan-items"
          custom-class="c-loan-items-item"
          :type="['active', 'others'][index]"
          :items="type"
        >
          <template v-slot:default="{ item }">
            <div class="c-loan-items-item-pic">
              <img :src="'/assets' + item.url_logo" />
            </div>
            <div class="c-loan-items-item-taeg">
              <span>
                <strong>TAEG </strong>
                <span v-if="taeg(item.taeg)[0] !== 'n.d.'"
                  >de <strong>{{ taeg(item.taeg)[0] }}</strong> à
                  <strong>{{ taeg(item.taeg)[1] }}</strong></span
                ><span v-else>
                  <strong>{{ taeg(item.taeg)[0] }}</strong></span
                ></span
              >
            </div>
            <div
              class="c-loan-items-item-example"
              v-if="item.exemple"
              :class="{ '-hide': isMobile && addClass }"
            >
              <span v-html="item.exemple" />
            </div>
            <div
              class="c-loan-items-item-options"
              :class="{ '-show': isMobile && (item.exemple ? addClass : 1) }"
            >
              <font-awesome-icon :icon="['fas', 'euro-sign']" />
              <font-awesome-icon :icon="['fas', 'calendar']" />
              <font-awesome-icon :icon="['fas', 'percent']" v-if="isMobile" />
            </div>
            <div
              class="c-loan-items-item-data-options"
              :style="!item.exemple ? 'width:auto' : ''"
              :class="{ '-show': isMobile && (item.exemple ? addClass : 1) }"
            >
              <div class="c-loan-items-item-data-options-amount">
                <div>
                  <span>Montant : Min </span
                  ><span v-html="formatCurrency(item.montant_min)" />
                  <span> - Max </span
                  ><span v-html="formatCurrency(item.montant_max)" />
                </div>
              </div>
              <div
                class="c-loan-items-item-data-options-duration"
                :class="{ '-show': isMobile && addClass }"
              >
                <div>
                  <span>Durée : Min </span
                  ><span v-html="item.duree_min + ' mois'" /><span> - Max </span
                  ><span v-html="item.duree_max + ' mois'" />
                </div>
              </div>
              <div
                class="c-loan-items-item-data-options-taeg"
                :class="{ '-show': isMobile && addClass }"
                v-if="isMobile"
              >
                <div>
                  <strong>TAEG </strong>
                  <span v-if="taeg(item.taeg)[0] !== 'n.d.'"
                    >de <strong>{{ taeg(item.taeg)[0] }}</strong> à
                    <strong>{{ taeg(item.taeg)[1] }}</strong></span
                  ><span v-else>
                    <strong>{{ taeg(item.taeg)[0] }}</strong></span
                  >
                </div>
              </div>
            </div>
            <div class="c-loan-items-item-simulate">
              <span>simuler</span>
            </div>
          </template>
          <template
            v-slot:no-data
            v-if="
              ![active, others][index].length &&
              !loading[['active', 'others'][index]]
            "
          >
            <span class="c-loan-others"> Aucune offre disponible </span>
          </template>
          <template v-slot:footer v-if="index === 0">
            <span class="c-loan-others"> Autre crédits disponibles: </span>
          </template>
          <template v-slot:loading>
            <CubeGrid />
          </template>
        </Loader></div
    ></template>
  </div>
</template>
<script>
import { debounce } from 'debounce'
import Loader from '~/components/loader.vue'
import CubeGrid from '~/components/cubegrid.vue'

export default {
  components: { Loader, CubeGrid },
  async mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
    await this.fetchOffers()
    this.showHideDetails()
  },
  watch: {
    isMobile() {
      this.showHideDetails()
    },
  },
  methods: {
    getLimits() {
      const arr = this.active
      if (arr.length == 0) return
      const amountMin = arr.reduce((prev, curr) =>
        prev.montant_min < curr.montant_min ? prev : curr
      ).montant_min
      const amountMax = arr.reduce((prev, curr) =>
        prev.montant_max > curr.montant_max ? prev : curr
      ).montant_max

      const durationMin = arr.reduce((prev, curr) =>
        prev.duree_min < curr.duree_min ? prev : curr
      ).duree_min
      const durationMax = arr.reduce((prev, curr) =>
        prev.duree_max > curr.duree_max ? prev : curr
      ).duree_max

      this.$store.commit('options/updateAmountLimits', {
        amountMin,
        amountMax,
      })

      this.$store.commit('options/updateDurationLimits', {
        durationMin,
        durationMax,
      })
    },
    showHideDetails() {
      if (this.isMobile) {
        this.interval = setInterval(() => {
          this.addClass = !this.addClass
        }, 5000)
      } else {
        if (this.interval) {
          clearInterval(this.interval)
        }
      }
    },
    resize() {
      this.isMobile = window.innerWidth < 970
    },
    async fetchOffers(loadOthers = true) {
      const productLabel = this.categories.find(
        (c) => c.slug === this.selectedNav
      )
      if (!productLabel) {
        this.$router.push('/')
        this.$store.commit('nav/updateSelectedNav', '')
        return
      }
      const params = {
        product: productLabel.slug,
        filters: {
          active: { operator: '=', value: 1 },
          montant_min: { operator: '<=', value: this.amount },
          montant_max: { operator: '>=', value: this.amount },
          duree_min: { operator: '<=', value: this.duration },
          duree_max: { operator: '>=', value: this.duration },
        },
      }

      this.loading['active'] = true
      if (loadOthers) {
        this.loading['others'] = true
      }

      const active = await this.$axios.$post(this.apiLink, params)
      let others
      if (loadOthers) {
        params.others = true
        others = await this.$axios.$post(this.apiLink, params)
      }

      if (active.statusCode === 200) {
        this.active = active.body
        this.loading['active'] = false
        this.active = this.sort.sortFn(this.active)
      }
      if (loadOthers) {
        if (others.statusCode === 200) {
          this.others = others.body
          this.loading['others'] = false
        }
      }

      this.getLimits()
    },
    taeg(value) {
      return value.split(' &agrave; ')
    },
    formatCurrency(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '€'
    },
  },
  data() {
    return {
      interval: null,
      addClass: false,
      active: [],
      others: [],
      loading: { active: false, others: false },
      isMobile: false,
    }
  },
  watch: {
    userInteraction: debounce(function () {
      this.fetchOffers()
      this.$store.commit('options/updateUserInteraction', {
        userInteraction: false,
      })
    }, 500),
    sort() {
      this.active = this.sort.sortFn(this.active)
    },
  },
  computed: {
    userInteraction() {
      return this.$store.getters['options/getUserInteraction']
    },
    apiLink() {
      return 'https://lv3qt7akj5.execute-api.eu-west-3.amazonaws.com/dev'
    },
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
