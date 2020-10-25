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
          You have entered the black hole
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="error"
            block
            depressed
            @click.stop="$router.replace('/')"
          >
            Send me back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
}
</script>
