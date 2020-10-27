<template>
  <v-dialog
    v-model="dialogMessage"
    max-width="500px"
    persistent
  >
    <v-card>
      <v-card-title primary-title>
        Message
      </v-card-title>
      <v-card-text> {{ message }} </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          small
          @click.stop="handleDialogMessage({ show: false })"
        >
          关闭
        </v-btn>
        <v-btn
          color="primary"
          depressed
          small
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      showMessage: 'dialog/showMessage',
      message: 'dialog/message',
    }),
    dialogMessage: {
      // ? 防止因以其他方式关闭dialog导致直接向vuex.state赋值
      get() {
        return this.showMessage
      },
      set(show) {
        this.handleDialogMessage({
          message: show ? this.message : undefined,
          show,
        })
      },
    },
  },
  methods: {
    ...mapActions({
      handleDialogMessage: 'dialog/showMessage',
    }),
  },
}
</script>
