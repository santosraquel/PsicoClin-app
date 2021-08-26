<template>
  <v-app>
    <sidebar-menu />
    <v-sheet
      id="appContent"
      class="overflow-y-auto"
      style="height: 100vh;"
    >
      <v-main :class="$vuetify.breakpoint.name">
        <nuxt />
      </v-main>
      <app-footer />
    </v-sheet>
  </v-app>
</template>

<style lang="scss">
html, body, #app {
  overflow: hidden !important;
}

#appContent {
  background: var(--v-primary-lighten1);
}

.flexcard {
  display: flex !important;
  flex-direction: column !important;
}
</style>

<script>
import AppFooter from '~/components/AppFooter.vue'
import SidebarMenu from '~/components/SidebarMenu.vue'

export default {
  middleware: 'authenticate',

  components: { AppFooter, SidebarMenu },

  data () {
    return {
    }
  },
}
</script>
