import Vue from 'vue'
import { mapMutations } from 'vuex'

export default Vue.extend({
  methods: {
    ...mapMutations(['setPopup']),

    onMsg (msg, type = 'warning') {
      this.setPopup({
        msg,
        type,
        status: true,
      })
    },

    successSnack (msg) {
      this.onMsg(msg || 'Operação realizada com sucesso.', 'success')
    },

    infoSnack (msg) {
      this.onMsg(msg || 'Operação realizada com sucesso.', 'info')
    },

    warnSnack (msg) {
      this.onMsg(msg || 'Operação realizada com sucesso.', 'warning')
    },

    errorSnack (msg) {
      this.onMsg(msg || 'Oops... Algo de errado.', 'error')
    },
  },
})
