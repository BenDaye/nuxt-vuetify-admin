<template>
  <v-breadcrumbs :items="items" />
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
