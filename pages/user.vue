<template>
  <v-container
    fluid
    class="fill-height flex-column align-stretch flex-nowrap pa-6"
  >
    <z-page-header :meta="$metaInfo" />
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      info: {
        title: '会员管理',
        desc: '管理会员',
      },
    }
  },
}
</script>
