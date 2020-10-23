<template>
  <v-list nav>
    <v-list-item
      v-for="route in routes"
      :key="route.to"
      link
      :to="route.to"
    >
      <v-list-item-icon>
        <v-icon>mdi-file</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ route.name }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  computed: {
    routes() {
      return this.$router.options.routes.map((r) => {
        return {
          name: r.name,
          to: r.path,
        }
      })
    },
  },
}
</script>
