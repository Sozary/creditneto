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
    min: { type: Number },
    max: { type: Number },
    step: { type: Number },
    title: { type: String, default: '' },
    type: { type: String, default: '' },
    reason: { type: String, default: '' },
    format: { type: Function, default: (v) => v },
    value: {
      type: Number,
    },
  },
  watch: {
    showValue() {
      if (this.showValue) {
        this.$store.commit('options/updateSliderStatus', {
          type: { Montant: 'amount', Durée: 'duration' }[this.title],
          value: 'active',
        })
      } else {
        this.$store.commit('options/updateSliderStatus', {
          type: { Montant: 'amount', Durée: 'duration' }[this.title],
          value: 'inactive',
        })
      }
    },
    value(value) {
      this.selectedValue = value
    },
    selectedValue(value) {
      if (this.reason === 'after-limit') {
        this.showValue = true
      }
      this.$emit('input', parseInt(value))
      this.$store.commit('options/updateUserInteraction', {
        userInteraction: true,
        reason: this.reason,
      })
    },
  },
  computed: {
    computedStep() {
      return this.step || (this.max - this.min) / 100
    },
    computedTitle() {
      return (
        this.title +
        ': ' +
        (this.showValue ? this.format(this.value) + this.type : '-')
      )
    },
  },
  data() {
    return {
      selectedValue: this.value,
      showValue: false,
    }
  },
}
</script>
