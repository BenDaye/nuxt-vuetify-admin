<template>
  <v-btn
    color="info"
    text
    small
    @click.stop="show"
  >
    {{ btnText }}
  </v-btn>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    type: {
      type: String,
      default() {
        return null
      },
      required: true,
    },
    text: {
      type: String,
      default() {
        return 'Show'
      },
      required: true,
    },
    id: {
      type: [Number, String],
      default() {
        return null
      },
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      admin: 'admin/admin',
      user: 'user/user',
    }),
    btnText() {
      const id = this.id
      const type = this.type
      switch (type) {
        case 'admin':
          return this.getAdminName(id)
        case 'user':
          return this.getUserName(id)
        default:
          return this.text
      }
    },
  },
  methods: {
    ...mapActions({
      showDetail: 'dialog/show',
    }),
    show() {
      const id = this.id
      const type = this.type
      this.showDetail({ id, type })
    },
    getAdminName(id) {
      if (!id) { return }
      const _a = this.admin.find(a => a.id === id)
      return _a ? _a.username : id
    },
    getUserName(id) {
      if (!id) { return }
      const _u = this.user.find(u => u.id === id)
      return _u ? _u.username : id
    },
  },
}
</script>
