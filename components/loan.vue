<template>
  <div class="px-3 md:px-28 max-w-[1000px] mx-auto">
    <span
      class="text-black text-[8px] font-bold font-montserrat ml-3 md:text-[15px]"
    >
      Annonces:
    </span>
    <Loader
      v-for="(type, index) in [active, others]"
      :key="index"
      :loading="loading[['active', 'others'][index]]"
      custom-class-container="mb-2 mt-1.5"
      custom-class="mb-2 flex loan-item rounded-[50px] overflow-hidden no-underline h-10 md:h-[50px] group transition-all relative"
      :type="['active', 'others'][index]"
      :items="type"
    >
      <template v-slot:default="{ item }">
        <div
          class="w-full h-full bg-transparent transition-all z-10 absolute group-hover:bg-[rgba(0,0,0,.1)]"
        ></div>
        <div class="flex justify-center items-center">
          <img
            :src="'/assets' + item.url_logo"
            class="h-6 mr-3.5 ml-1.5 w-16 md:w-28 md:h-9 md:mr-1.5"
          />
        </div>
        <div
          class="text-center items-center md:max-w-[104px] md:px-2 md:flex hidden"
        >
          <div class="font-montserrat text-[10px] font-bold text-black">
            TAEG
            <span v-if="taeg(item.taeg)[0] !== 'n.d.'" class="font-normal">
              de
              <span class="font-bold">{{ taeg(item.taeg)[0] }}</span>
              à
              <span class="font-bold">{{ taeg(item.taeg)[1] }}</span>
            </span>
            <span v-else>{{ taeg(item.taeg)[0] }}</span>
          </div>
        </div>
        <div
          class="flex items-center flex-grow w-[300px] md:max-w-[400px] md:mr-3"
          v-if="showExample && item.exemple !== ''"
        >
          <span
            v-html="item.exemple"
            class="text-dark-grey text-[6px] md:text-[9px] font-montserrat three-lines"
          />
        </div>
        <div
          class="flex flex-col flex-grow w-[300px] my-1 justify-center text-[7px] md:text-[13px] md:min-w-[300px]"
          v-if="showData || !item.exemple"
        >
          <div class="flex mb-0.5">
            <font-awesome-icon
              :icon="['fas', 'euro-sign']"
              class="text-green w-2 md:w-3.5 mr-1.5"
            />
            <div
              class="font-bold font-montserrat text-black md:one-line lg:one-line"
            >
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
              class="text-green w-2 md:w-3.5 mr-1.5"
            />
            <div
              class="font-bold font-montserrat text-black md:one-line lg:one-line"
            >
              Durée : Min
              <span class="text-green" v-html="item.duree_min + ' mois'" />
              - Max
              <span class="text-green" v-html="item.duree_max + ' mois'" />
            </div>
          </div>
          <div class="flex mb-0.5 md:hidden">
            <font-awesome-icon
              :icon="['fas', 'percent']"
              class="text-green w-2 mr-1.5"
            />
            <div class="font-bold font-montserrat text-black">
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
          class="bg-green flex justify-center items-center w-16 py-2.5 px-1.5 md:px-6 group-hover:bg-dark-green transition-all ml-auto"
        >
          <span
            class="uppercase text-white text-[11px] md:text-base font-bold font-montserrat"
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
        <span class="text-black text-sm font-bold font-montserrat">
          <!-- Aucune offre disponible -->
        </span>
      </template>
      <template v-slot:footer v-if="index === 0">
        <span
          class="text-black text-sm font-bold font-montserrat"
          v-if="!globalLoading"
        >
          Autres crédits disponibles:
        </span>
      </template>
      <template v-slot:loading>
        <div class="flex justify-center my-2">
          <!-- <CubeGrid /> -->
        </div>
      </template>
    </Loader>
  </div>
</template>
<script>
import Loader from '~/components/loader.vue'
import CubeGrid from '~/components/cubegrid.vue'

export default {
  components: { Loader, CubeGrid },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
    this.showHideDetails()
  },
  methods: {
    getLimits() {
      if (this.loansForCategory.length == 0) return

      const amountMin = this.loansForCategory.reduce((prev, curr) =>
        prev.montant_min < curr.montant_min ? prev : curr
      ).montant_min
      const amountMax = this.loansForCategory.reduce((prev, curr) =>
        prev.montant_max > curr.montant_max ? prev : curr
      ).montant_max

      const durationMin = this.loansForCategory.reduce((prev, curr) =>
        prev.duree_min < curr.duree_min ? prev : curr
      ).duree_min
      const durationMax = this.loansForCategory.reduce((prev, curr) =>
        prev.duree_max > curr.duree_max ? prev : curr
      ).duree_max

      this.$store.commit('options/updateAmountLimits', {
        amountMin: amountMin,
        amountMax: amountMax,
      })

      this.$store.commit('options/updateDurationLimits', {
        durationMin: durationMin,
        durationMax: durationMax,
      })

      this.$store.commit('options/updateLimits', true)
    },
    showHideDetails() {
      if (this.isMobile) {
        this.interval = setInterval(() => {
          this.showExample = !this.showExample
          this.showData = !this.showData
        }, 2500)
      } else {
        this.showExample = true
        this.showData = true
        if (this.interval) {
          clearInterval(this.interval)
        }
      }
    },
    resize() {
      this.isMobile = window.innerWidth < 987
    },
    applyParams(filters) {
      return this.loansForCategory.filter((loan) => {
        for (let filter of Object.keys(filters)) {
          if (loan.hasOwnProperty(filter) && filters[filter].value !== null) {
            const ev = eval(
              `${loan[filter]} ${filters[filter].operator} ${filters[filter].value}`
            )
            if (!ev) {
              return false
            }
          }
        }
        return true
      })
    },
    fetchOffers() {
      this.$store.commit('options/updateLockUpdate', true)
      if (!this.slidersActive) {
        this.getLimits()
      }

      if (!this.productLabel) {
        this.$router.push('/')
        this.$store.commit('nav/updateSelectedNav', '')
        return
      }

      const filters = {
        active: { operator: '==', value: 1 },
        montant_min: {
          operator: '<=',
          value: !this.slidersActive ? null : this.amount,
        },
        montant_max: {
          operator: '>=',
          value: !this.slidersActive ? null : this.amount,
        },
        duree_min: {
          operator: '<=',
          value: !this.slidersActive ? null : this.duration,
        },
        duree_max: {
          operator: '>=',
          value: !this.slidersActive ? null : this.duration,
        },
      }

      if (this.loansForCategory && this.getLoans) {
        this.loading['active'] = true
        this.loading['others'] = true
        this.active = [...this.loansForCategory]
        this.others = [...this.getLoans].splice(0, 5)

        this.active = this.sort.sortFn(this.active)
        this.active = this.applyParams(filters)

        this.loading['active'] = false
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
      showExample: true,
      showData: false,
      interval: null,
      active: [],
      others: [],
      loading: { active: false, others: false },
      isMobile: false,
    }
  },
  watch: {
    userInteraction(value) {
      if (value.value && value.reason !== 'limit') {
        this.fetchOffers()
        this.$store.commit('options/updateUserInteraction', {
          userInteraction: false,
        })
      }
    },
    selectedNav() {
      console.log('change')
    },
    isMobile() {
      this.showHideDetails()
    },
    loansForCategory() {
      this.fetchOffers()
    },
    sort() {
      this.active = this.sort.sortFn(this.active)
    },
  },
  computed: {
    amountActive() {
      return (
        this.$store.getters['options/getSliderStatus']['amount'] === 'active'
      )
    },
    durationActive() {
      return (
        this.$store.getters['options/getSliderStatus']['duration'] === 'active'
      )
    },
    slidersActive() {
      return this.amountActive || this.durationActive
    },
    loansForCategory() {
      return (this.getLoans || [])
        .filter((loan) => loan.type == this.productLabel.id_produit)
        .map((loan) => {
          return {
            ...loan,
            duree_min: parseInt(loan.duree_min),
            duree_max: parseInt(loan.duree_max),
            montant_max: parseInt(loan.montant_max),
            montant_min: parseInt(loan.montant_min),
          }
        })
    },
    productLabel() {
      return this.categories.find((c) => c.slug === this.selectedNav)
    },
    getLockUpdate() {
      return this.$store.getters['options/getLockUpdate']
    },
    getLoans() {
      return this.$store.getters['loans/getLoans']
    },
    globalLoading() {
      return this.loading['active'] && this.loading['others']
    },
    userInteraction() {
      return this.$store.getters['options/getUserInteraction']
    },
    apiLink() {
      return 'https://cisede.eu/demo/aim/credit-creditneto/api/credit'
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
