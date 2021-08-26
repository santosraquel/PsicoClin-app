<template>
  <div>
    <v-autocomplete
      v-model="modelValue"
      :items="items"
      :rules="rules"
      item-text="name"
      item-value="_id"
      return-object
      chips
      :multiple="multiple"
      :loading="loading"
      :search-input.sync="search"
      :hide-details="hideDetails"
      :label="label"
      :outlined="outlined"
      @change="$emit('change')"
      @focus="list(' ')"
      @click:append-outer="openForm(modelValue)"
    >
      <template slot="append-item">
        <v-list-item @click="openForm()">
          <v-list-item-title>
            Novo Usuário
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-autocomplete>
    <!-- Modal form !-->
    <modal-form ref="form" @saved="addSaved" />
  </div>
</template>

<script>
import { usersService } from '../UsersService'
import { OnAutocomplete } from '~/mixins'

export default {
  components: {
    ModalForm: () => import('./ModalForm'),
  },

  mixins: [OnAutocomplete],

  beforeCreate () {
    this.$service = usersService
  },
}
</script>
