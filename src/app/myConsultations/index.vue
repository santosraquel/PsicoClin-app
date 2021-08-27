<template>
  <v-container>
    <v-layout class="sectionHeader">
      <h3>{{ pageTitle }}</h3>
      <v-spacer />
      <v-btn dark color="pink" @click="openForm">
        <v-icon>mdi-plus</v-icon>
        Adicionar
      </v-btn>
    </v-layout>
    <v-progress-linear v-if="loading" indeterminate />
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="count"
      class="elevation-1 clickRow"
      @click:row="open"
    >
      <template v-slot:[`item.price`]="{ item }">
        <span :inner-html.prop="item.price | currency" />
      </template>

      <template v-slot:[`item.dateConsult`]="{ item }">
        <span :inner-html.prop="item.dateConsult | formatDate" />
      </template>

      <template v-slot:[`item.action`]="{ item }">
        <!-- EDITAR !-->
        <v-btn
          color="primary"
          title="Editar"
          icon
          @click.stop="openForm(item)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <!-- EXCLUIR !-->
        <v-btn
          color="primary"
          title="Excluir"
          icon
          @click.stop="removeHandler(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Modal form !-->
    <modal-form ref="form" @saved="addSaved" />

    <modal-confirm
      v-model="showConfirmModal"
      confirm-btn-color="error"
      confirm-btn-text="Excluir"
      title="Excluir Usuário"
      :confirm-btn-disabled="!canRemove"
      @cancel="cancelRemove()"
      @confirm="remove(target)"
    >
      <p>Excluindo consulta do paciente "<b>{{ `${target.name} ` }}</b>";</p>
      <v-text-field
        v-model="confirmValue"
        label="Confirme o nome"
        :rules="[rules.required, (v) => canRemove || 'Dados não conferem']"
        outlined
      />
    </modal-confirm>
  </v-container>
</template>

<script>
import { OnRules } from 'vuetify-js-utils'

import { OnMsg, CrudPage } from '@/mixins'
import ModalForm from '@/app/consultations/components/ModalForm'
import ModalConfirm from '@/components/commons/ModalConfirm'
import { myConsultationsService } from '@/app/consultations/ConsultationsService'

export default {

  components: { ModalForm, ModalConfirm },

  mixins: [CrudPage, OnRules, OnMsg],

  data () {
    return {
      pageTitle: 'Consultas',
      docExistsMsg: 'Consulta já cadastrada',
      headers: [
        {
          text: 'Data',
          value: 'dateConsult',
        },
        {
          text: 'Horário',
          value: 'time',
        },
        {
          text: 'Preço',
          value: 'price',
        },
        {
          text: 'Ações',
          value: 'action',
          sortable: false,
        },
      ],
      target: {},
      showConfirmModal: false,
      confirmValue: '',
    }
  },

  computed: {
    canRemove () {
      return this.confirmValue === this.target.name
    },
  },

  beforeCreate () {
    this.$service = myConsultationsService
  },

  methods: {
    open (item) {
      this.$refs.form.open(item)
    },

    removeHandler (item) {
      this.target = item
      this.showConfirmModal = true
    },

    cancelRemove () {
      this.target = {}
      this.infoSnack('Ação cancelada pelo usuário.')
    },
  },
}
</script>
