<template>
  <v-list
    nav
    dense
  >
    <template v-for="route in routes">
      <v-list-group
        v-if="route.children && route.children.length"
        :key="route.name"
        prepend-icon="mdi-book-variant"
      >
        <template #activator>
          <v-list-item-content>{{ route.name || route.path.slice(1) }}</v-list-item-content>
        </template>
        <template v-for="child in route.children">
          <v-list-item
            v-if="child.path !== ':id'"
            :key="child.name"
            :to="{ name: child.name }"
          >
            <v-list-item-icon>
              <v-icon>mdi-circle-medium</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ child.name }}</v-list-item-content>
          </v-list-item>
        </template>
      </v-list-group>
      <v-list-item
        v-else
        :key="route.name"
        link
        :to="route.path"
      >
        <v-list-item-icon>
          <v-icon>mdi-book-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>{{ route.name }}</v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  computed: {
    routes() {
      return this.$router.options.routes
    },
  },
}
</script>
