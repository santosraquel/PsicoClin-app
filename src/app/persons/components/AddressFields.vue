<template>
  <v-row>
    <v-col
      cols="12"
      md="3"
    >
      <v-text-field
        v-model="address.zipCode"
        label="CEP"
        outlined
      />
    </v-col>
    <v-col
      cols="12"
      md="5"
    >
      <v-text-field
        v-model="address.street"
        label="Rua/logradouro"
        outlined
      />
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
      <v-text-field
        v-model="address.neighborhood"
        label="Bairro"
        outlined
      />
    </v-col>

    <v-col
      cols="12"
      md="2"
    >
      <v-text-field
        v-model="address.number"
        label="Nº"
        outlined
      />
    </v-col>

    <v-col
      cols="12"
      md="4"
    >
      <v-select
        v-model="address.estate"
        outlined
        label="Estado"
        :items="estates"
        item-text="nome"
        item-value="sigla"
        :rules="[rules.required]"
      />
    </v-col>
    <v-col
      cols="12"
      md="6"
    >
      <v-select
        v-model="address.city"
        :disabled="cities.length <= 0"
        outlined
        label="Cidade"
        :items="cities"
        :rules="[rules.required]"
      />
    </v-col>
  </v-row>
</template>

<script>
import { OnRules } from 'vuetify-js-utils'
import * as locals from '~/data/estados-cidades.json'
import { arraySearch } from '~/utils'

export default {
  mixins: [OnRules],

  props: {
    address: { type: Object, required: true },
  },

  data: () => ({
    cities: [],
  }),

  computed: {
    estates () {
      return locals.estados
    },
  },

  watch: {
    'address.estate': {
      handler (v) {
        if (v) {
          const estate = arraySearch('sigla', v, this.estates)
          this.cities = estate.cidades
        }
      },
      immediate: true,
    },
  },
}
</script>
