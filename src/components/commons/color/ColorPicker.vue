<template>
  <v-select
    v-model="valueModel"
    label="Cor liturgica"
    :items="colorOptions"
    return-object
    item-text="text"
    clearable
    outlined
    eager
  />
</template>

<style scoped>
  label {
    border-bottom: 2px var(--v-primary-base) solid;
    display: block;
    margin-bottom: 3px;
  }
</style>

<script>
import { colorOptions } from './colorOptions'
import { OnModel } from '~/mixins'

export default {

  mixins: [OnModel],
  props: {
    maxWidth: {
      type: String,
      default: '400px',
    },
    title: {
      type: String,
      default: '',
    },
    titleClass: {
      type: [String, Array],
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    cancelBtnText: {
      type: String,
      default: 'Cancelar',
    },
    confirmBtnColor: {
      type: String,
      default: 'primary',
    },
    confirmBtnText: {
      type: String,
      default: 'OK',
    },
    confirmBtnDisabled: Boolean,
    // v-model
    value: Object,
  },

  computed: {
    valueModel: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      },
    },
    colorOptions () {
      return colorOptions.getItems()
    },
  },
  methods: {
    submit (val, event) {
      this.valueModel = false
      this.$emit(val, event)
    },
  },
}

</script>
