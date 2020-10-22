<template>
  <v-app>
    <v-navigation-drawer
      v-model="showMainMenu"
      app
      mini-variant
      bottom
      expand-on-hover
    >
      1
    </v-navigation-drawer>
    <v-app-bar
      app
      elevate-on-scroll
    >
      <v-app-bar-nav-icon @click="handleClick" />
      <v-toolbar-title>欢迎访问</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn v-bind="attrs" color="primary" dark icon v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="item in accountMenu" :key="item.key" @click="handleClickAccountMenuItem(item.key)">
            <v-list-item-title>{{ item.value }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      1
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: ['authenticated'],
  data() {
    return {
      showMainMenu: true,
      accountMenu: [
        {
          key: 0,
          value: '登出',
        },
      ],
    }
  },
  methods: {
    handleClick() {
      this.showMainMenu = !this.showMainMenu
    },
    handleClickAccountMenuItem(key) {
      switch (key) {
        case 0:
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
