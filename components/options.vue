<template>
  <div>
    <div class="flex mt-5 justify-between mx-3 md:px-20">
      <Select
        class="hidden md:block w-60"
        :items="categories"
        clearable
        v-if="selectedCategory"
        :reason="reason"
        v-model="selectedCategory"
        :redirect="true"
        default-value="Sélectionnez un type de crédit"
      />
      <img
        src="/assets/icons/calculate.svg"
        @click="updateShowCalculate(true)"
        class="w-36 h-8 cursor-pointer ml-4 md:hidden"
      />
      <Slider
        v-if="selectedCategory"
        class="hidden md:block"
        v-model="selectedAmount"
        :min="amountMin"
        :max="amountMax"
        title="Montant"
        :format="formatCurrency"
        :reason="reason"
        type="€"
      />
      <Slider
        :reason="reason"
        v-if="selectedCategory"
        class="hidden md:block"
        v-model="selectedMonths"
        :min="durationMin"
        :max="durationMax"
        title="Durée"
        type=" mois"
      />
      <Select
        :reason="reason"
        :items="sorts"
        v-model="selectedSort"
        default-value="Partenaire"
        class="w-40"
        v-if="selectedNav !== ''"
      />
    </div>
    <transition name="slideLeft">
      <div
        class="bg-light-grey w-screen h-full overflow-y-hidden fixed top-0 left-0 z-50"
        v-if="showCalculate"
      >
        <img
          src="/assets/icons/calculate-simple.svg"
          alt="logo"
          class="w-20 transform -translate-x-1/2 ml-[50%] mt-16"
        />
        <img
          src="/assets/icons/validate.svg"
          alt="logo"
          @click="updateShowCalculate(false)"
          class="w-10 absolute top-6 cursor-pointer right-7"
        />
        <div class="flex flex-col mt-20 mx-12 items-start gap-6">
          <Slider
            v-if="selectedCategory"
            class="w-full"
            v-model="selectedAmount"
            :min="amountMin"
            :max="amountMax"
            title="Montant"
            :format="formatCurrency"
            type="€"
            :reason="reason"
          />
          <Slider
            v-if="selectedCategory"
            class="w-full"
            :reason="reason"
            v-model="selectedMonths"
            :min="durationMin"
            :max="durationMax"
            title="Durée"
            type=" mois"
          />
        </div>
        <img
          src="/assets/images/logo-right.png"
          class="absolute bottom-20 right-12"
        /></div
    ></transition>
  </div>
</template>
<script>
import Select from '~/components/select'
import Slider from '~/components/slider'
export default {
  components: { Select, Slider },
  data() {
    return {
      reason: 'limit',
      selectedCategory: this.$route.path.replace(/\//g, ''),
      selectedSort: '',
      selectedMonths: 60,
      selectedAmount: 100000,
      sorts: [
        {
          label: 'Partenaire',
          id: 'partner',
          sort: (items) => this.sortFn(items, 'partenaire', false),
        },
        {
          label: 'Montant max',
          id: 'max-amount',
          sort: (items) => this.sortFn(items, 'montant_max'),
        },
        {
          label: 'Montant min',
          id: 'min-amount',
          sort: (items) => this.sortFn(items, 'montant_min'),
        },
        {
          label: 'Durée max',
          id: 'max-duration',
          sort: (items) => this.sortFn(items, 'duree_max'),
        },
        {
          label: 'Durée min',
          id: 'min-duration',
          sort: (items) => this.sortFn(items, 'duree_min'),
        },
        {
          label: 'Rang',
          id: 'rank',
          sort: (items) => this.sortFn(items, 'classement'),
        },
      ],
    }
  },
  methods: {
    updateShowCalculate(show) {
      this.$store.commit('nav/updateShowCalculate', show)
    },
    sortFn(items, key, number = true) {
      return items.sort((a, b) =>
        number ? a[key] < b[key] : a[key].toLowerCase() < b[key].toLowerCase()
      )
    },
    formatCurrency(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    updateDuration() {
      this.selectedMonths = (this.durationMax - this.durationMin) / 2
    },
    updateAmount() {
      this.selectedAmount = (this.amountMax - this.amountMin) / 2
    },
  },
  mounted() {
    this.selectedSort = this.sorts[0].id
  },
  watch: {
    updateLimits(val) {
      if (val) {
        this.reason = 'limit'
        this.updateDuration()
        this.updateAmount()
        this.$store.commit('options/updateLimits', false)
        this.$store.commit('options/updateLockUpdate', false)
        this.$nextTick(() => {
          this.reason = 'after-limit'
        })
      }
    },
    selectedSort(val) {
      this.$store.commit('options/updateSort', {
        val,
        sortFn: this.sorts.find((s) => s.id === val).sort,
      })
    },
    selectedMonths(val) {
      this.$store.commit('options/updateDuration', val)
    },
    selectedAmount(val) {
      this.$store.commit('options/updateAmount', val)
    },
    selectedCategory(value) {
      history.pushState({}, null, value || '/')
      this.$store.commit('nav/updateSelectedNav', value)
    },
  },
  computed: {
    updateLimits() {
      return this.$store.getters['options/getUpdateLimits']
    },
    amountMin() {
      return this.$store.getters['options/getAmountMin']
    },
    amountMax() {
      return this.$store.getters['options/getAmountMax']
    },
    durationMin() {
      return this.$store.getters['options/getDurationMin']
    },
    durationMax() {
      return this.$store.getters['options/getDurationMax']
    },
    selectedNav() {
      return this.$store.getters['nav/selectedNav']
    },
    showCalculate() {
      return this.$store.getters['nav/showCalculate']
    },
    categories() {
      return this.$store.getters['nav/categories'].map((e) => {
        return {
          label: e.label,
          id: e.slug,
        }
      })
    },
  },
}
</script>
