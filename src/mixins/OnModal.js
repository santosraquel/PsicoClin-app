import ModalBase from '~/mixins/components/ModalBase'

export default {
  components: {
    ModalBase,
  },

  computed: {
    isOpen: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      },
    },
  },

  props: {
    value: Boolean,
  },

  methods: {
    open () {
      this.isOpen = true
    },

    close () {
      this.isOpen = false
    },
  },
}
