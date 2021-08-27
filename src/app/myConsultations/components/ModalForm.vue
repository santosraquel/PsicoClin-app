<template>
  <modal-base persistent :width="'40%'">
    <template slot="content">
      <v-form ref="form">
        <v-row>
          <v-col cols="12" md="6">
            <date-picker
              v-model="target.dateConsult"
              label="Data"
              :rules="[rules.date]"
              disabled
              outlined
            />
          </v-col>
          <v-col cols="12" md="6">
            <times-auto-complete
              v-model="target.time"
              label="Hora"
              disabled
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
              disabled
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
import { myConsultationsService } from '../MyConsultationsService'
import { MyConsultation } from '../MyConsultation'
import DatePicker from '~/components/commons/DatePicker.vue'
import TimesAutoComplete from '~/components/commons/TimesAutoComplete.vue'

export default {
  components: {
    DatePicker,
    TimesAutoComplete,
  },

  mixins: [OnRules, OnFormModal],

  computed: {
    title () {
      return this.isUpdate ? 'Editar Consulta' : 'Adicionar nova consulta'
    },
  },

  beforeCreate () {
    this.Model = MyConsultation
    this.$service = myConsultationsService
  },
}
</script>
