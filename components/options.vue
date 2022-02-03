<template>
  <div class="c-options">
    <Select
      :items="categories"
      clearable
      v-model="selectedCategory"
      default="Sélectionnez un type de crédit"
    />
    <Slider
      v-model="selectedAmount"
      :min="0"
      :max="200000"
      title="Montant"
      :format="formatCurrency"
      type="€"
    />
    <Slider
      v-model="selectedMonths"
      :min="6"
      :step="1"
      :max="120"
      title="Durée"
      type=" mois"
    />
    <Select :items="filters" v-model="selectedFilter" default="Partenaire" />
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
      selectedFilter: '',
      selectedMonths: 0,
      selectedAmount: 0,
      filters: [
        { label: 'Montant max', id: 'max-amount' },
        { label: 'Montant min', id: 'min-amount' },
        { label: 'Durée max', id: 'max-duration' },
        { label: 'Durée min', id: 'min-duration' },
        { label: 'Rang', id: 'rank' },
      ],
    }
  },
  methods: {
    formatCurrency(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
  },
  mounted() {
    this.selectedMonths = 36
    this.selectedAmount = 100000
  },
  watch: {
    selectedMonths(val) {
      this.$store.commit('options/updateDuration', val)
    },
    selectedAmount(val) {
      this.$store.commit('options/updateAmount', val)
    },
    selectedCategory(value) {
      history.pushState({}, null, value || '/')
      this.$store.commit('nav/changeSelectedNav', value)
    },
  },
  computed: {
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
