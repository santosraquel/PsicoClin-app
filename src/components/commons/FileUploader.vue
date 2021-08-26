<template>
  <div>
    <label v-text="label" />
    <v-layout v-if="loading">
      <v-progress-circular
        size="20"
        color="info"
        class="mr-1"
        indeterminate
      /> Enviando...
    </v-layout>
    <template v-else>
      <v-btn v-if="modelValue" text small>
        <v-icon
          left
          color="info"
          @click="dialog = true, previewImage = modelValue"
        >
          mdi-eye
        </v-icon>
        Vizualizar
      </v-btn>

      <v-btn text small @click="filePicker">
        <v-icon left>
          {{ modelValue ? 'mdi-pen' : 'mdi-image' }}
        </v-icon>
        {{ modelValue ? 'Alterar imagem' : 'Enviar imagem' }}
      </v-btn>
    </template>
    <input
      ref="inputFile"
      hidden
      type="file"
      accept="image/*"
      @change="uploadFile"
    >
  </div>
</template>

<style scoped>
  label {
    border-bottom: 2px var(--v-primary-base) solid;
    display: block;
    margin-bottom: 3px;
  }
</style>

<script>
import { OnModel, OnMsg } from '~/mixins'
import AbstractService from '~/utils/AbstractService'

export default {

  mixins: [OnModel, OnMsg],

  props: {
    value: { type: String, required: true },
    label: { type: String, default: 'Enviar arquivo' },
  },

  data () {
    return {
      loading: false,
      hide: false,
    }
  },

  methods: {

    filePicker () {
      this.$refs.inputFile.click()
    },

    async uploadFile () {
      try {
        this.loading = true
        const file = this.$refs.inputFile.files[0]

        if (!file) {
          this.errorWarning('Sem arquivo')
          return
        }

        const formData = new FormData()
        formData.append('file', file)

        const service = new AbstractService()

        const response = await service.request('multipart/form-data')
          .post('api/upload', formData)

        this.modelValue = response.data.path
      } catch (error) {
        console.error(error)
        this.errorSnack('Erro ao enviar arquivo')
      }
      this.loading = false
    },
  },
}
</script>
