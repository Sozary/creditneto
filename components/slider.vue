<template>
  <div class="c-slider">
    <span class="c-slider-title" v-html="computedTitle" />
    <input
      @click="updateSlider"
      type="range"
      :step="computedStep"
      :min="min"
      :max="max"
      v-model="selectedValue"
    />
    <div class="c-slider-info">
      <span v-html="format(min) + type"></span>
      <span v-html="format(max) + type"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number },
    title: { type: String, default: '' },
    type: { type: String, default: '' },
    format: { type: Function, default: (v) => v },
    value: {
      type: Number,
    },
  },
  methods: {
    updateSlider() {
      this.$store.commit('options/updateUserInteraction', {
        userInteraction: true,
      })
    },
  },
  watch: {
    value(value) {
      this.selectedValue = value
    },
    selectedValue(val) {
      this.$emit('input', parseInt(val))
    },
  },
  computed: {
    computedStep() {
      return this.step || (this.max - this.min) / 100
    },
    computedTitle() {
      return this.title + ': ' + this.format(this.value) + this.type
    },
  },
  data() {
    return { selectedValue: this.value }
  },
}
</script>
