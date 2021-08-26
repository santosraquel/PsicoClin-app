<template>
  <v-navigation-drawer
    v-model="drawer"
    class="sidebar-menu"
    app
    expand-on-hover
    clipped
  >
    <!-- main -->
    <v-list shaped>
      <template v-for="(item, i) in routes">
        <v-list-item
          v-if="!item.items"
          :key="`list-${i}`"
          :to="item.to"
          active-class="primary--text"
          nuxt
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-else
          :key="`list-${i}`"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.to"
            nuxt
          >
            <v-list-item-icon>
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="child.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>

    <!-- footer -->
    <template v-slot:append>
      <v-list shaped>
        <v-list-item
          class="profile"
          two-line
        >
          <v-list-item-avatar size="40px">
            <v-img :src="user.avatar || require('@/assets/img/avatar.png')" />
          </v-list-item-avatar>

          <v-list-item-content v-if="user">
            <v-list-item-title>{{ user.nickname || user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          active-class="primary--text"
          @click="submit"
        >
          <v-list-item-action>
            <v-icon>mdi-arrow-left</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import OnMsg from '@/mixins/OnMsg'

import routes from '@/data/routes.json'

export default {
  mixins: [OnMsg],

  computed: {
    ...mapState('account', ['user']),

    drawer: {
      get () {
        return this.$store.state.sidebarMenu
      },

      set (bool) {
        this.$store.commit('setSidebarMenu', bool)
      },
    },

    routes () {
      // Editor has acess to Viewer routes
      const editorRoles = ['Editor', 'Viewer']

      console.log(this.user.role)

      return routes.filter((group) => {
        if (group.items) {
          group.items = group.items.filter((child) => {
            switch (this.user.role) {
              case 'Admin':
                return true
              case 'Editor':
                return editorRoles.includes(child.role)
              case 'Viewer':
                return child.role === 'Viewer'
            }
          })
        }

        switch (this.user.role) {
          case 'Admin':
            return true
          case 'Editor':
            return editorRoles.includes(group.role)
          case 'Viewer':
            console.log(group.role === 'Viewer')
            return group.role === 'Viewer'
        }
      })
    },
  },

  methods: {
    ...mapActions('account', ['signOut']),

    async submit () {
      try {
        await this.signOut()

        this.$router.resolve({ path: '/login' }).route.meta.user = null
        this.$router.push('/login')
      } catch (err) {
        console.error(err)

        this.errorSnack()
      }
    },
  },
}
</script>

<style lang="scss">
.sidebar-menu {
  .profile {
    background-color: #f9fcff;

    .v-avatar {
      position: relative;
      right: 8px;
    }

    .v-list-item__title {
      font-weight: 600;
      font-size: 16px;
      line-height: normal;
      color: var(--v-primary-lighten1) !important;
    }

    .v-list-item__subtitle {
      font-size: 10px;
      letter-spacing: .4px;
    }
  }

  .v-list-item__title {
    font-size: 14px;
  }
}
</style>
