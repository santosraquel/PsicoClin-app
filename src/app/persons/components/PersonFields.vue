<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="person.name"
          label="Nome Completo"
          :rules="[rules.required]"
          outlined
        />
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-text-field
          v-model="person.cpf"
          v-mask="['###.###.###-##']"
          label="CPF"
          :rules="[rules.cpf]"
          outlined
        />
      </v-col>
      <v-col
        cols="10"
        md="3"
      >
        <v-text-field
          v-model="person.rg"
          v-mask="'##########'"
          label="RG"
          :disabled="person.noIe"
          outlined
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="person.phones[0]"
          v-mask="['(##) ####-####', '(##) #####-####']"
          label="Telefone 1"
          :rules="[rules.required]"
          outlined
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="person.phones[1]"
          v-mask="['(##) ####-####', '(##) #####-####']"
          label="Telefone 2"
          outlined
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="person.emails[0]"
          label="E-mail 1"
          outlined
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="person.emails[1]"
          label="E-mail 2"
          outlined
        />
      </v-col>
      <v-col
        cols="12"
      >
        <fieldset>
          <legend>Endereço</legend>
          <address-fields :address="person.address[0]" />
        </fieldset>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { OnRules } from 'vuetify-js-utils'
import { mask } from 'vue-the-mask'
import AddressFields from './AddressFields'

export default {
  directives: { mask },

  components: {
    AddressFields,
  },

  mixins: [OnRules],

  props: {
    person: { type: Object, required: true },
  },

}
</script>
