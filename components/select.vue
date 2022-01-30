<template>
  <div class="c-select" v-on-clickaway="clickOutside">
    <div class="c-select-box" @click="toggle">
      <span class="c-select-box-label">{{ selectDisplay }}</span>
      <div class="c-select-box-icons">
        <img
          src="/assets/icons/close.svg"
          @click.stop="clear"
          v-if="clearable"
          class="c-select-box-icons-close"
        />
        <img
          src="/assets/icons/arrow.svg"
          class="c-select-box-icons-toggle"
          :class="{ '-active': toggled }"
        />
      </div>
    </div>
    <transition name="slide">
      <div class="c-select-options" v-if="toggled">
        <div
          class="c-select-options-option"
          v-for="item of items"
          :key="item.id"
          :class="{ '-selected': selectedValue === item.id }"
          @click="updateValue(item.id)"
        >
          <span>{{ item.label }}</span
          ><img src="/assets/icons/done.svg" />
        </div></div
    ></transition>
  </div>
</template>
<script>
import { directive as onClickaway } from 'vue-clickaway'
export default {
  directives: {
    onClickaway: onClickaway,
  },
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
    default: {
      type: String,
    },
  },
  data() {
    return { selectedValue: this.value, toggled: false }
  },
  computed: {
    selectDisplay() {
      return this.selectedValue
        ? this.items.find((i) => i.id === this.selectedValue).label
        : this.default
    },
  },
  methods: {
    clear() {
      this.selectedValue = ''
      this.toggled = false
    },
    clickOutside() {
      this.toggled = false
    },
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
