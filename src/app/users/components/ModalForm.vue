<template>
  <modal-base persistent :width="580">
    <template slot="content">
      <v-form ref="form">
        <v-text-field
          v-model="target.name"
          label="Nome"
          :rules="[rules.required]"
        />
        <v-text-field
          v-model="target.lastname"
          label="Sobrenome"
          :rules="[rules.required]"
        />
        <v-text-field
          v-model="target.nickname"
          label="Apelido"
        />
        <v-text-field
          v-model="target.email"
          label="E-mail"
          type="email"
          :rules="[rules.email]"
        />
        <v-select
          v-model="target.role"
          :rules="[rules.required]"
          :items="['Viewer', 'Editor', 'Admin']"
          label="Grupo de acesso"
        />
      </v-form>
    </template>
  </modal-base>
</template>

<script>
import { OnRules } from 'vuetify-js-utils'

import { OnFormModal } from '@/mixins'
import { usersService } from '../UsersService'
import { User } from '../User'

export default {

  mixins: [OnRules, OnFormModal],

  computed: {
    title () {
      return this.isUpdate ? 'Editar Usuário' : 'Adicionar novo Usuário'
    },
  },

  beforeCreate () {
    this.Model = User
    this.$service = usersService
  },
}
</script>
