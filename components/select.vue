<template>
  <div class="c-select">
    <div class="c-select-box" @click="toggle">
      <span class="c-select-box-label">{{ selectDisplay }}</span>
      <div class="c-select-box-icons">
        <img
          src="/assets/icons/close.svg"
          @click.stop="selectedValue = ''"
          class="c-select-box-close"
        />
        <img
          src="/assets/icons/arrow.svg"
          class="c-select-box-toggle"
          :class="{ '-active': toggled }"
        />
      </div>
    </div>
    <div class="c-select-options" :class="{ '-show': toggled }">
      <div
        class="c-select-options-option"
        v-for="item of items"
        :key="item.id"
        :class="{ '-selected': selectedValue === item.id }"
        @click="updateValue(item.id)"
      >
        <span>{{ item.label }}</span
        ><img src="/assets/icons/done.svg" />
      </div>
    </div>
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
    return { selectedValue: this.value, toggled: false }
  },
  computed: {
    selectDisplay() {
      return this.selectedValue
        ? this.items.find((i) => i.id === this.selectedValue).label
        : 'Sélectionnez un type de crédit'
    },
  },
  methods: {
    updateValue(value) {
      this.selectedValue = value
      this.toggle()
    },
    toggle() {
      this.toggled = !this.toggled
    },
  },
  watch: {
    selectedValue(value) {
      this.$emit('input', value)
    },
  },
}
</script>
