<template>
  <div v-on-clickaway="clickOutside" class="relative">
    <div
      class="border rounded flex justify-between border-solid py-1.5 px-3.5 items-center cursor-pointer"
      @click="toggle"
    >
      <span class="text-sm font-roboto">{{ selectDisplay }}</span>
      <div class="ml-5 flex items-center gap-2">
        <img
          src="/assets/icons/close.svg"
          @click.stop="clear"
          v-if="clearable"
          class="w-2 h-2"
        />
        <img
          src="/assets/icons/arrow.svg"
          class="w-5 transform transition-all"
          :class="{ 'rotate-180': toggled }"
        />
      </div>
    </div>
    <transition name="fade">
      <div
        class="flex flex-col border border-solid border-medium-grey w-3/4 p-4 rounded mt-4 absolute bg-white z-20"
        v-if="toggled"
      >
        <component
          class="cursor-pointer flex justify-between no-underline text-black hover:bg-light-grey rounded p-1 transition-all"
          v-for="item of items"
          @click="updateValue(item.id)"
          :is="redirect ? 'a' : 'div'"
          :key="item.id"
          :href="'/' + item.id"
        >
          <span class="text-sm font-roboto">{{ item.label }}</span
          ><img
            src="/assets/icons/done.svg"
            class="w-3.5"
            v-if="selectedValue === item.id"
          />
        </component></div
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
    redirect: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
    defaultValue: {
      type: String,
    },
  },
  data() {
    return { selectedValue: this.value, toggled: false }
  },
  computed: {
    selectDisplay() {
      return this.selectedValue
        ? this.items.find((i) => i?.id === this.selectedValue)?.label
        : this.defaultValue
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
      if (this.redirect) return
      this.selectedValue = value
      this.toggle()
    },
    toggle() {
      this.toggled = !this.toggled
    },
  },
  watch: {
    value() {
      this.selectedValue = this.value
    },
    selectedValue(value) {
      this.$emit('input', value)
    },
  },
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.fade-enter-active {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
.fade-leave-active {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
