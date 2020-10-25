<template>
  <v-breadcrumbs
    :items="items"
    class="pa-0 py-3"
  />
</template>

<script>
export default {
  computed: {
    items() {
      const route = this.$route.matched
      return route.map((r) => {
        return {
          text: r.name,
          to: r.path,
        }
      })
    },
  },
}
</script>
