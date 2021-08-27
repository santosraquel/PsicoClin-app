<template>
  <modal-base persistent :width="'60%'">
    <template slot="content">
      <v-form ref="form">
        <person-fields :person="target" />
      </v-form>
    </template>
  </modal-base>
</template>

<script>
import { OnFormModal } from '@/mixins'
import { personsService } from '../PersonsService'
import { Person } from '../persons'
import PersonFields from './PersonFields'

export default {

  components: {
    PersonFields,
  },

  mixins: [OnFormModal],

  computed: {
    title () {
      return this.isUpdate ? 'Editar Pessoa' : 'Adicionar nova Pessoa'
    },
  },

  beforeCreate () {
    this.Model = Person
    this.$service = personsService
  },
}
</script>
