<template>
  <v-container class="fill-height">
    <v-row
      justify="center"
      align="center"
    >
      <v-card max-width="480">
        <v-card-title primary-title>
          Ooooooooooooops!
        </v-card-title>
        <v-card-text>
          <p class="error--text">
            {{ error && error.message }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="error"
            block
            depressed
            @click.stop="handleDamn"
          >
            Damn!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
  methods: {
    handleDamn() {
      this.$dialog.message.info('Check it in console Or Try refresh', { position: 'top-right' })
    },
  },
}
</script>
