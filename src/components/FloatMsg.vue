<template>
  <v-snackbar
    v-model="snackbar"
    :color="popup.type"
    right
  >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="popup.msg" />
    <v-btn
      icon
      @click="snackbar = false"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['popup']),

    snackbar: {
      get () {
        return this.popup.status
      },
      set (bool) {
        this.setBoolPopup(bool)
      },
    },
  },

  methods: mapMutations(['setBoolPopup']),
}
</script>
