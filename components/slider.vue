<template>
  <div class="flex flex-col">
    <div
      class="text-xs font-montserrat font-bold mb-2 md:mb-0"
      v-html="computedTitle"
    />
    <input
      type="range"
      :step="computedStep"
      :min="min"
      class="slider"
      :max="max"
      v-model="selectedValue"
    />
    <div
      class="flex justify-between text-[10px] font-montserrat text-dark-grey"
    >
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
  watch: {
    value(value) {
      this.selectedValue = value
    },
    getPass(value) {
      if (value) {
        this.pass = 2
        this.$store.commit('options/updatePass', false)
      }
    },
    selectedValue(val) {
      this.$emit('input', parseInt(val))
      if (this.pass === 0) {
        this.$store.commit('options/updateUserInteraction', {
          userInteraction: true,
        })
      } else {
        this.pass--
      }
    },
  },
  computed: {
    trueDisplay() {
      return this.$store.getters['options/getTrueDisplay']
    },
    getPass() {
      return this.$store.getters['options/getPass']
    },
    computedStep() {
      return this.step || (this.max - this.min) / 100
    },
    computedTitle() {
      return (
        this.title +
        ': ' +
        (this.trueDisplay ? this.format(this.value) + this.type : '-')
      )
    },
  },
  data() {
    return { selectedValue: this.value, pass: 2 }
  },
}
</script>
