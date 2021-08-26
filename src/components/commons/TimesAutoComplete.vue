<template>
  <v-autocomplete
    v-model="modelValue"
    :label="label"
    :items="items"
    :search-input.sync="search"
    :multiple="multiple"
    :hide-details="hideDetails"
    outlined
    chips
  />
</template>

<script>
import { OnModel } from '~/mixins'

export default {

  mixins: [OnModel],

  props: {
    label: { type: String, required: true },
    value: { type: [Array, String], required: true },
    multiple: Boolean,
    hideDetails: Boolean,
  },

  data: () => ({
    search: '',
    copyAccount: '',
    items: [],
  }),

  created () {
    for (let i = 0; i <= 23; i++) {
      let hh = i

      if (i < 10) {
        hh = '0' + i
      }
      this.items.push(`${hh}:00`)
      this.items.push(`${hh}:15`)
      this.items.push(`${hh}:30`)
      this.items.push(`${hh}:45`)
    }
  },
}
</script>
