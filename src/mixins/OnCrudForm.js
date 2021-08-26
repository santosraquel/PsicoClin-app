import _ from 'lodash'
import ModalBase from '@/mixins/components/ModalBase'
import OnMsg from './OnMsg'
import OnModal from './OnModal'
import { planeObject } from '~/utils'

export default {
  components: {
    ModalBase,
  },

  mixins: [OnMsg, OnModal],

  data () {
    return {
      target: new this.Model(),
      isUpdate: false,
      error: false,
      persistent: true,
      saving: false,
      edited: false,
      loading: true,
      loaded: false,
      key: new Date().getTime(),
      hideFooter: true,
      docExistsMsg: 'Falha ao salvar: ID já existe.',
    }
  },

  mounted () {
    if (!this.service) {
      console.error('Service don\'t defined. Please set this.service in component\'s beforeCreate that use OnFormModal mixin.')
    }
    if (!this.Model) {
      console.error('Model don\'t defined. Please set this.Model in component\'s beforeCreate that use OnFormModal mixin.')
    }
  },

  computed: {
    title () {
      return this.isUpdate ? 'Editar' : 'Adicionar'
    },
  },

  watch: {
    target: {
      deep: true,
      handler () {
        this.edited = true
      },
    },
  },

  methods: {
    /**
     * Load data and/or open form
     * @param {string, object}
     */
    async open (objOrId, load = true) {
      try {
        this.loading = true
        this.beforeOpen && await this.beforeOpen(objOrId)
        this.isOpen = true
        this.target = new this.Model()
        this.isUpdate = false
        this.saving = false
        this.hideFooter = true
        if (!load) {
          this.target = _.merge(this.target, planeObject(objOrId))
          this.isUpdate = !!this.target._id
        } else if (objOrId && (
          (typeof objOrId._id === 'string' && objOrId._id) ||
          typeof objOrId === 'string')) {
          this.isUpdate = true
          const target = await this.service.get(objOrId._id || objOrId)
          // Load data over Model
          this.target = _.merge(this.target, target)
        }
        await this.$nextTick()
        this.$refs.form && this.$refs.form.resetValidation()
        setTimeout(() => {
          this.edited = false
          this.hideFooter = false
        }, 300)
        this.afterOpen && await this.afterOpen(objOrId)
      } catch (err) {
        this.errorSnack()
        this.error = true
        console.error(err)
      }
      this.loading = false
    },

    submit (close = true) {
      // Validate a form before save
      if (this.validate()) {
        return this.save(close)
      }
    },

    validate () {
      if (!this.$refs.form.validate()) {
        this.warnSnack('Preencha os campos obrigatórios.')
        return false
      }
      return true
    },

    mergeData (data) {
      this.target = _.merge(this.target, data)
    },

    close () {
      this.isOpen = false
      this.loading = true
    },

    handlerClose () {
      if (!this.edited || (this.edited &&
      window.confirm('Você tem certeza? Dados serão perdidos.'))) {
        this.close()
      }
    },

    async save (close = true) {
      try {
        this.saving = true
        const saved = await this.service.save(this.target, this.isUpdate)
        _.merge(this.target, saved)
        this.$emit('saved', saved)
        this.$emit('change', false)
        if (close) {
          this.close()
          this.successSnack('Dados salvos com sucesso!')
        }
        this.edited = false
        this.isUpdate = true
      } catch (err) {
        if (close) {
          this.errorSnack()
          console.error('Falha ao savar', err)
          if (err.message === 'doc_exists') {
            this.warnSnack(this.docExistsMsg)
            return
          }
        } else {
          throw err
        }
      }
      this.saving = false
    },
  },
}
