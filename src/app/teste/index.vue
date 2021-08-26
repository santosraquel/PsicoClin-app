<template>
  <v-container>
    <v-layout class="sectionHeader">
      <h3>{{ pageTitle }}</h3>
      <v-spacer />
      <v-text-field
        v-model="search"
        hide-details
        clearable
        label="Pesquisar"
        append-icon="mdi-magnify"
        @keyup="autoList()"
        @keyup.enter="list()"
        @click:append="list()"
      />
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
      <p>Excluindo usuário com "<b>{{ `${target.name} ${target.lastname} (${target.email})` }}</b>";</p>
      <v-text-field
        v-model="confirmValue"
        label="Confirme o E-mail"
        :rules="[rules.required, (v) => canRemove || 'Dados não conferem']"
        outlined
      />
    </modal-confirm>
  </v-container>
</template>

<script>
import { OnRules } from 'vuetify-js-utils'

import { OnMsg, OnCrudPage } from '@/mixins'
import ModalForm from '@/app/users/components/ModalForm'
import ModalConfirm from '@/components/commons/ModalConfirm'
import { usersService } from '@/app/users/UsersService'

export default {

  components: { ModalForm, ModalConfirm },

  mixins: [OnCrudPage, OnRules, OnMsg],

  data () {
    return {
      search: '',
      pageTitle: 'Usuários',
      docExistsMsg: 'Usuário já cadastrado',
      headers: [
        {
          text: 'Nome',
          value: 'name',
        },
        {
          text: 'Sobrenome',
          value: 'lastname',
        },
        {
          text: 'E-mail',
          value: 'email',
        },
        {
          text: 'Grupo de acesso',
          value: 'role',
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
      return this.confirmValue === this.target.email
    },
  },

  beforeCreate () {
    this.$service = usersService
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
