<template>
  <div class="c-options" :class="{ '-show-calculate': showCalculate }">
    <img
      :src="`/assets/images/calculate${showCalculate ? '-open' : ''}.svg`"
      @click="updateShowCalculate"
      class="c-options-show-calculate"
      v-if="selectedNav !== ''"
    />
    <Select
      :items="categories"
      v-if="isDesktop"
      clearable
      v-model="selectedCategory"
      default="Sélectionnez un type de crédit"
    />
    <Slider
      v-if="selectedCategory"
      class="c-options-slider"
      v-model="selectedAmount"
      :min="0"
      :max="200000"
      title="Montant"
      :format="formatCurrency"
      type="€"
    />
    <Slider
      v-if="selectedCategory"
      class="c-options-slider"
      v-model="selectedMonths"
      :min="6"
      :step="1"
      :max="120"
      title="Durée"
      type=" mois"
    />
    <img src="/assets/images/logo-right.png" class="c-options-logo-right" />
    <Select
      :items="sorts"
      v-model="selectedSort"
      default="Partenaire"
      v-if="selectedNav !== ''"
    />
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
      selectedMonths: 60,
      isDesktop: false,
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
    updateShowCalculate() {
      if (!this.showCalculate) {
        this.$store.commit('nav/updateShowCalculate', !this.showCalculate)
      }
    },
    resize() {
      this.isDesktop = window.innerWidth >= 970
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
