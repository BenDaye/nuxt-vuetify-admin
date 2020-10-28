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
      <v-autocomplete
        ref="search"
        v-model="searchKey"
        :loading="searching"
        :items="searchItems"
        :search-input.sync="searchInput"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        :placeholder="searchLabel"
        solo-inverted
        prepend-inner-icon="mdi-text-search"
      />
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
    <v-footer
      app
      inset
    >
      <v-spacer />
      <span class="text-uppercase caption">
        Built with
        <a
          class="text-decoration-none text-decoration-dashed"
          href="https://www.github.com/BenDaye"
          target="_blank"
        >
          Ben@Zingy
        </a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
// TODO: define searchItems
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
      searchKey: null,
      searching: false,
      searchItems: [],
      searchInput: null,
      searchLabel: 'Search (press "ctrl + /" to focus)',
    }
  },
  mounted() {
    this.getAdmin()
    this.getUser()
    // ???: 监听按下'ctrl + /'触发searchbar.focus()
    window.addEventListener('keydown', this.handleKeydown)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown)
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
    handleKeydown(ev) {
      // eslint-disable-next-line no-caller
      const e = ev || window.event || arguments.callee.caller.arguments[0]
      if (!e) {
        return
      }
      const { key, ctrlKey } = e
      return ctrlKey && key === '/' && e.target !== this.$refs.search.$refs.input && (e.preventDefault(), this.$refs.search.focus())
    },
  },
}
</script>
