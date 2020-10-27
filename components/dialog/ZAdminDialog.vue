<template>
  <v-dialog
    v-model="dialogAdmin"
    max-width="500px"
    persistent
  >
    <v-card>
      <v-card-title primary-title>
        Admin
      </v-card-title>
      <v-card-text> {{ admin }} </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          small
          @click.stop="handleDialogAdmin({ show: false })"
        >
          Close
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
      showAdmin: 'dialog/showAdmin',
      admin: 'dialog/admin',
    }),
    dialogAdmin: {
      // ???: 防止因以其他方式关闭dialog导致直接向vuex.state赋值
      get() {
        return this.showAdmin
      },
      set(show) {
        this.handleDialogAdmin({
          admin: show ? this.admin : undefined,
          show,
        })
      },
    },
  },
  methods: {
    ...mapActions({
      handleDialogAdmin: 'dialog/showAdmin',
    }),
  },
}
</script>
