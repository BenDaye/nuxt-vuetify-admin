<template>
  <v-dialog
    v-model="dialogNews"
    max-width="500px"
    persistent
  >
    <v-card>
      <v-card-title primary-title>
        News
      </v-card-title>
      <v-card-text> {{ news }} </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          small
          @click.stop="handleDialogNews({ show: false })"
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
      showNews: 'dialog/showNews',
      news: 'dialog/news',
    }),
    dialogNews: {
      // ? 防止因以其他方式关闭dialog导致直接向vuex.state赋值
      get() {
        return this.showNews
      },
      set(show) {
        this.handleDialogNews({
          news: show ? this.news : undefined,
          show,
        })
      },
    },
  },
  methods: {
    ...mapActions({
      handleDialogNews: 'dialog/showNews',
    }),
  },
}
</script>
