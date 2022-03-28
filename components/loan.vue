<template>
  <div class="px-3">
    <span class="text-black text-[8px] font-bold font-montserrat ml-3">
      Annonces:
    </span>
    <div class="c-loan-offers">
      <Loader
        v-for="(type, index) in [active, others]"
        mode="fit"
        :key="index"
        :loading="loading[['active', 'others'][index]]"
        custom-class-container="mb-2 mt-1.5"
        custom-class="mb-2 flex loan-item rounded-[50px] overflow-hidden no-underline h-10"
        :type="['active', 'others'][index]"
        :items="type"
      >
        <template v-slot:default="{ item }">
          <div class="flex justify-center items-center">
            <img
              :src="'/assets' + item.url_logo"
              class="h-5 mr-3.5 ml-1.5 w-16"
            />
          </div>
          <div class="flex justify-center items-center" v-if="showExample">
            <span
              v-html="item.exemple"
              v-if="item.exemple"
              class="text-dark-grey text-[6px] font-helvetica"
            />
          </div>
          <div class="flex flex-col flex-grow my-1" v-if="showData">
            <div class="flex mb-0.5">
              <font-awesome-icon
                :icon="['fas', 'euro-sign']"
                class="text-green w-2 text-[7px] mr-1.5"
              />
              <div class="text-[7px] font-bold font-montserrat text-black">
                Montant : Min
                <span
                  class="text-green"
                  v-html="formatCurrency(item.montant_min)"
                />
                - Max
                <span
                  class="text-green"
                  v-html="formatCurrency(item.montant_max)"
                />
              </div>
            </div>
            <div class="flex mb-0.5">
              <font-awesome-icon
                :icon="['fas', 'calendar']"
                class="text-green w-2 text-[7px] mr-1.5"
              />
              <div class="text-[7px] font-bold font-montserrat text-black">
                Durée : Min
                <span class="text-green" v-html="item.duree_min + ' mois'" />
                - Max
                <span class="text-green" v-html="item.duree_max + ' mois'" />
              </div>
            </div>
            <div class="flex mb-0.5">
              <font-awesome-icon
                :icon="['fas', 'percent']"
                v-if="isMobile"
                class="text-green w-2 text-[7px] mr-1.5"
              />
              <div class="text-[7px] font-bold font-montserrat text-black">
                TAEG
                <span v-if="taeg(item.taeg)[0] !== 'n.d.'" class="font-normal">
                  de
                  <span class="font-bold text-green">{{
                    taeg(item.taeg)[0]
                  }}</span>
                  à
                  <span class="font-bold text-green">{{
                    taeg(item.taeg)[1]
                  }}</span>
                </span>
                <span v-else>{{ taeg(item.taeg)[0] }}</span>
              </div>
            </div>
          </div>
          <div
            class="bg-green flex justify-center items-center w-16 py-2.5 px-1.5"
          >
            <span
              class="uppercase text-white text-[11px] font-bold font-montserrat"
            >
              Simuler
            </span>
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
          <span class="text-black text-[8px] font-bold font-montserrat ml-3">
            Autre crédits disponibles:
          </span>
        </template>
        <template v-slot:loading>
          <CubeGrid />
        </template>
      </Loader>
    </div>
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
    await this.fetchOffers(true, true)
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
          this.showExample = !this.showExample
          this.showData = !this.showData
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
    async fetchOffers(loadOthers = true, firstLoad = false) {
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
          montant_min: {
            operator: '<=',
            value: firstLoad ? null : this.amount,
          },
          montant_max: {
            operator: '>=',
            value: firstLoad ? null : this.amount,
          },
          duree_min: {
            operator: '<=',
            value: firstLoad ? null : this.duration,
          },
          duree_max: {
            operator: '>=',
            value: firstLoad ? null : this.duration,
          },
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
      showExample: true,
      showData: false,
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
