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
      1
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
  data () {
    return {
      showMainMenu: false,
    }
  },
  mounted () {
    this.$axios.get('/api/user')
  },
  methods: {
    handleClick () {
      this.showMainMenu = !this.showMainMenu
    },
  },
}
</script>
