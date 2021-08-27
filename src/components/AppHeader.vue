<template>
  <v-app-bar
    app
    clipped-left
    color="white"
  >
    <!-- left -->
    <v-app-bar-nav-icon
      class="ml-0 mr-3"
      @click.stop="toggleSidebarMenu"
    />
    <v-toolbar-title>
      <a href="/">
        <h1>
          <v-img
            max-width="150"
            alt="Psicoclin"
            src="/logo.png"
          />
        </h1>
      </a>
    </v-toolbar-title>
    <v-spacer />
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['toggleSidebarMenu']),
  },
}
</script>
