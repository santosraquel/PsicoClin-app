<template>
  <div>
    <v-autocomplete
      v-model="modelValue"
      :items="formatedItems"
      :rules="rules"
      item-text="label"
      item-value="_id"
      prepend-inner-icon="mdi-account"
      return-object
      hide-no-data
      hide-selected
      :append-outer-icon="modelValue && modelValue._id ? 'mdi-pencil' : 'mdi-plus'"
      :loading="loading"
      :search-input.sync="search"
      :label="label"
      :disabled="disabled"
      :outlined="outlined"
      no-filter
      @change="$emit('change')"
      @focus="list(' ')"
      @click:append-outer="openForm(modelValue)"
    >
      <template slot="append-item">
        <v-list-item @click="openForm()">
          <v-list-item-title>
            Nova Pessoa
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-autocomplete>
    <!-- Modal form !-->
    <modal-form ref="form" @saved="addSaved" />
  </div>
</template>

<script>
import { OnAutocomplete } from '@/mixins'
import { personsService } from '../PersonsService'

export default {
  components: {
    ModalForm: () => import('./ModalPersonForm'),
  },

  mixins: [OnAutocomplete],

  computed: {
    formatedItems () {
      return this.items.map((item) => {
        item.label = `${item.name}`
        item.label += item.cpfCnpj ? ` | ${item.cpfCnpj}` : ''
        return item
      })
    },
  },

  beforeCreate () {
    this.$service = personsService
  },
}
</script>
