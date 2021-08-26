import Vue from 'vue'
import OnModel from './OnModel'
import { arraySearch } from '~/utils'

export default Vue.extend({
  mixins: [OnModel],
  props: {
    value: { type: [Object, Array, String], default: () => (undefined) },
    rules: { type: Array, required: false, default: () => (undefined) },
    label: { type: String, default: '' },
    disabled: Boolean,
    hideDetails: Boolean,
    multiple: Boolean,
    autofocus: Boolean,
    chips: Boolean,
    outlined: Boolean,
    changeOnly: Boolean,
  },

  data: () => ({
    items: [],
    loading: false,
    search: null,
  }),

  watch: {
    search (v) {
      setTimeout(() => {
        this.list(v)
      }, 500)
    },
  },

  created () {
    if (!this.$service) {
      console.error('Service don\'t defined. Please set this.$service in component\'s beforeCreate that use OnAutocomplete mixin.')
    }
    if (this.value) {
      if (Array.isArray(this.value)) {
        this.items.push(...this.value)
      } else if (this.value._id) {
        this.items.push(this.value)
      }
    }
  },

  methods: {
    async list (query) {
      try {
        if (!query || (this.modelValue && query === this.modelValue.label)) { return }
        this.loading = true
        const list = await this.$service.list({ search: query })
        this.items = list.items
      } catch (err) {
        console.error(err)
      }
      this.loading = false
    },

    removeItem (item) {
      const index = arraySearch('_id', item._id, this.modelValue, true)
      if (index >= 0) { this.modelValue.splice(index, 1) }
    },

    openForm (_id) {
      this.$refs.form.open(_id)
    },

    addSaved (item) {
      this.items.push(item)
      this.modelValue = item
      this.$emit('change')
    },
  },
})
