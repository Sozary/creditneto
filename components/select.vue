<template>
  <div class="c-select">
    <div class="c-select-box">
      <span class="c-select-box-label">Sélectionnez un type de crédit</span>
      <img src="/assets/icons/close.svg" class="c-select-box-close" />
      <img src="/assets/icons/arrow.svg" class="c-select-box-toggle" />
    </div>
    <select v-model="selectedValue">
      <option value="" disabled selected>Sélectionnez un type de crédit</option>
      <option :value="item.id" v-for="item of items" :key="item.id">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: [],
      required: true,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return { selectedValue: this.value }
  },

  watch: {
    selectedValue(value) {
      this.$emit('input', value)
    },
  },
}
</script>
