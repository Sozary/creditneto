<template>
  <div class="c-options" :class="{ '-show-calculate': showCalculate }">
    <img
      :src="`/assets/images/calculate${showCalculate ? '-open' : ''}.svg`"
      @click="updateShowCalculate"
      class="c-options-show-calculate"
    />
    <Select
      :items="categories"
      v-if="isDesktop"
      clearable
      v-model="selectedCategory"
      default="Sélectionnez un type de crédit"
    />
    <Slider
      class="c-options-slider"
      v-model="selectedAmount"
      :min="0"
      :max="200000"
      title="Montant"
      :format="formatCurrency"
      type="€"
    />
    <Slider
      class="c-options-slider"
      v-model="selectedMonths"
      :min="6"
      :step="1"
      :max="120"
      title="Durée"
      type=" mois"
    />
    <img src="/assets/images/logo-right.png" class="c-options-logo-right" />
    <Select :items="sorts" v-model="selectedSort" default="Partenaire" />
  </div>
</template>
<script>
import Select from '~/components/select'
import Slider from '~/components/slider'
export default {
  components: { Select, Slider },
  data() {
    return {
      selectedCategory: this.$route.path.slice(1),
      selectedSort: '',
      selectedMonths: 0,
      isDesktop: false,
      selectedAmount: 0,
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
    updateShowCalculate() {
      if (!this.showCalculate) {
        this.$store.commit('nav/updateShowCalculate', !this.showCalculate)
      }
    },
    resize() {
      this.isDesktop = window.innerWidth >= 1260
    },
    sortFn(items, key, number = true) {
      return items.sort((a, b) =>
        number ? a[key] < b[key] : a[key].toLowerCase() < b[key].toLowerCase()
      )
    },
    formatCurrency(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
  },
  mounted() {
    this.selectedMonths = 36
    this.selectedAmount = 100000
    this.selectedSort = this.sorts[0].id
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  watch: {
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
