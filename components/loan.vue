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
          :click-offer="clickOffer"
        >
          <template v-slot:default="{ item }">
            <div class="c-loan-items-item-pic">
              <img :src="'/assets' + item.url_logo" />
            </div>
            <div class="c-loan-items-item-taeg">
              <span>
                <strong>TAEG </strong> de
                <strong>{{ taeg(item.taeg)[0] }}</strong> à
                <strong>{{ taeg(item.taeg)[1] }}</strong></span
              >
            </div>
            <div
              class="c-loan-items-item-example"
              :class="{ '-hide': isMobile && addClass }"
            >
              <span v-html="item.exemple" />
            </div>
            <div
              class="c-loan-items-item-options"
              :class="{ '-show': isMobile && addClass }"
            >
              <font-awesome-icon :icon="['fas', 'euro-sign']" />
              <font-awesome-icon :icon="['fas', 'calendar']" />
              <font-awesome-icon :icon="['fas', 'percent']" v-if="isMobile" />
            </div>
            <div
              class="c-loan-items-item-data-options"
              :class="{ '-show': isMobile && addClass }"
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
                  <strong>TAEG </strong> <span>de</span>
                  <span>{{ taeg(item.taeg)[0] }}</span>
                  <span>à</span>
                  <span>{{ taeg(item.taeg)[1] }}</span>
                </div>
              </div>
            </div>
            <div class="c-loan-items-item-simulate">
              <span>simuler</span>
            </div>
          </template>
          <template v-slot:link="{ item }">
            <a
              :href="decodeURIComponent(item.url_redirection.split('ul=')[1])"
              class="c-loan-items-item-link"
              target="_blank"
              :ref="'item-' + ['active', 'others'][index] + '-' + item.id"
            ></a>
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
    async clickOffer(item, type) {
      const ip = await this.$axios.get(
        'https://ipgeolocation.abstractapi.com/v1/?api_key=a8949ec22fb24b4ab28957f4c0f4fbbd'
      )
      this.$axios.$post(
        window.location.origin + '/.netlify/functions/api',
        // 'https://lv3qt7akj5.execute-api.eu-west-3.amazonaws.com/dev',
        {
          product: item.id,
          ip: ip.data.ip_address,
        }
      )
      this.$refs['item-' + type + '-' + item.id][0].click()
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
      this.loading['others'] = true

      const active = await this.$axios.$post(
        window.location.origin + '/.netlify/functions/api',
        // 'https://lv3qt7akj5.execute-api.eu-west-3.amazonaws.com/dev',
        params
      )

      params.filters.active.value = 0
      const others = await this.$axios.$post(
        window.location.origin + '/.netlify/functions/api',
        // 'https://lv3qt7akj5.execute-api.eu-west-3.amazonaws.com/dev',
        params
      )
      if (active.statusCode === 200) {
        this.active = active.body
        this.loading['active'] = false
      }
      if (others.statusCode === 200) {
        this.others = others.body
        this.loading['others'] = false
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
