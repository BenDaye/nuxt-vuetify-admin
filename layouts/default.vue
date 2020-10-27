<template>
  <v-app>
    <v-navigation-drawer
      v-model="showMainMenu"
      app
      bottom
    >
      <z-nav />
    </v-navigation-drawer>
    <v-app-bar
      app
      elevate-on-scroll
    >
      <v-app-bar-nav-icon @click="handleClick" />
      <v-toolbar-title>Welcome</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-translate</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-menu
        offset-y
        bottom
        left
      >
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            color="primary"
            dark
            icon
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in accountMenu"
            :key="item.key"
            @click="handleClickAccountMenuItem(item.key)"
          >
            <v-list-item-title>{{ item.value }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <Nuxt />
      <z-dialog />
    </v-main>
    <v-footer app>
      1
    </v-footer>
  </v-app>
</template>

<script>
// TODO: Searchbar
// TODO: Footer
import { mapActions } from 'vuex'
export default {
  middleware: ['authenticated'],
  data() {
    return {
      showMainMenu: true,
      accountMenu: [
        {
          key: 0,
          value: 'Sign out',
        },
      ],
    }
  },
  mounted() {
    this.getAdmin()
    this.getUser()
  },
  methods: {
    ...mapActions({
      getAdmin: 'admin/getAdmin',
      getUser: 'user/getUser',
    }),
    handleClick() {
      this.showMainMenu = !this.showMainMenu
    },
    handleClickAccountMenuItem(key) {
      switch (key) {
        case 0:
          // TODO: Reset store state
          this.$token.remove()
          this.$axios.setToken(false)
          this.$router.push('/auth/sign_in')
          break
        default:
          break
      }
    },
  },
}
</script>
