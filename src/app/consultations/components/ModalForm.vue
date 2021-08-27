<template>
  <modal-base persistent :width="'40%'">
    <template slot="content">
      <v-form ref="form">
        <v-row>
          <v-col
            cols="12"
          >
            <person-auto-complete
              v-model="target.person"
              label="Paciente"
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <date-picker
              v-model="target.dateConsult"
              label="Data"
              :rules="[rules.date]"
              outlined
            />
          </v-col>
          <v-col cols="12" md="6">
            <times-auto-complete
              v-model="target.time"
              label="Hora"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-currency-field
              v-model="target.price"
              label="Preço"
              :rules="[rules.required]"
              prefix="R$"
              outlined
            />
          </v-col>
        </v-row>
      </v-form>
    </template>
  </modal-base>
</template>

<script>
import { OnRules } from 'vuetify-js-utils'

import { OnFormModal } from '@/mixins'
import { consultationsService } from '../ConsultationsService'
import { Consultation } from '../Consultation'
import PersonAutoComplete from '~/app/persons/components/PersonAutoComplete.vue'
import DatePicker from '~/components/commons/DatePicker.vue'
import TimesAutoComplete from '~/components/commons/TimesAutoComplete.vue'

export default {
  components: {
    PersonAutoComplete,
    DatePicker,
    TimesAutoComplete,
  },

  mixins: [OnRules, OnFormModal],

  computed: {
    title () {
      return this.isUpdate ? 'Editar Consulta' : 'Adicionar nova consulta'
    },
    moreThanZero () {
      return this.target.amount > 0 || 'Preencha um valor.'
    },
  },

  beforeCreate () {
    this.Model = Consultation
    this.$service = consultationsService
  },
}
</script>
