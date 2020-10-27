<template>
  <v-card>
    <v-card-text class="text-truncate">
      <v-data-table
        :headers="headers"
        :items="user"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title> {{ $metaInfo.info.title }} </v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            />
            <v-btn
              icon
              @click="getUser"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-spacer />
          </v-toolbar>
        </template>
        <template #item.id="{ item }">
          <v-tooltip right>
            <template #activator="{ attrs, on }">
              <v-btn
                class="px-0 text-decoration-dashed"
                text
                small
                v-bind="attrs"
                v-on="on"
              >
                # {{ item.id }}
              </v-btn>
            </template>
            <span>Copy</span>
          </v-tooltip>
        </template>
        <template #item.username="{ item }">
          <v-avatar
            size="32px"
            class="mr-1 elevation-4"
          >
            <img
              v-if="item.avatar"
              :src="`${item.avatar}?height=48`"
              alt="Avatar"
            >
            <v-icon
              v-else
              size="32px"
              color="default"
            >
              mdi-account-circle
            </v-icon>
          </v-avatar>
          {{ item.username }}
        </template>
        <template #item.role="{ item }">
          <v-chip
            v-for="(r, i) in item.role"
            :key="i"
            :color="r === 'waiter' ? 'primary' : ''"
            :class="i ? 'ml-1' : ''"
            small
            label
          >
            {{ r }}
          </v-chip>
        </template>
        <template #item.status="{ item }">
          <v-chip
            :color="item.status | status('user', { color: true })"
            small
            label
          >
            {{ item.status | status('user') }}
          </v-chip>
        </template>
        <template #item.gender="{ item }">
          {{ item.gender | gender }}
        </template>
        <template #item.created_at="{ item }">
          {{ item.created_at | fmt('yyyy-MM-dd') }}
        </template>
        <template #item.updated_at="{ item }">
          {{ item.updated_at | fmt('yyyy-MM-dd') }}
        </template>
        <template #item.actions="{ item }">
          <v-btn
            icon
            small
            :to="{ name: 'user-id', params: { id: item.id } }"
          >
            <v-icon> mdi-open-in-new </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'child',
  data() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'left',
          value: 'id',
          width: 240,
        },
        {
          text: 'Account',
          align: 'left',
          value: 'username',
          width: 240,
        },
        // {
        //   text: 'Level',
        //   align: 'center',
        //   value: 'level',
        // },
        // {
        //   text: 'WeChat',
        //   align: 'left',
        //   value: 'wechat',
        // },
        {
          text: 'Phone',
          align: 'left',
          value: 'phone',
        },
        {
          text: 'Email',
          align: 'left',
          value: 'email',
        },
        // {
        //   text: 'Nickname',
        //   align: 'right',
        //   value: 'nickname',
        //   width: 240,
        // },
        // {
        //   text: 'Gender',
        //   align: 'center',
        //   value: 'gender',
        // },
        {
          text: 'Role',
          align: 'center',
          value: 'role',
        },
        {
          text: 'Status',
          align: 'center',
          value: 'status',
          width: 120,
        },
        {
          text: 'CreatedAt',
          align: 'right',
          value: 'created_at',
          width: 120,
        },
        {
          text: 'UpdatedAt',
          align: 'right',
          value: 'updated_at',
          width: 120,
        },
        {
          text: 'Actions',
          align: 'right',
          value: 'actions',
          sortable: false,
          width: 80,
        },
      ],
      dialog: false,
      valid: false,
      loading: false,
      form: {
        account: '',
        password: '123456',
        name: '',
      },
      rules: {
        account: [
          v => !!v || 'Required',
          v => v.length >= 6 || '长度为6-36位',
          v => v.length <= 36 || '长度为6-36位',
        ],
        nickname: [
          v => !!v || 'Required',
          v => v.length >= 2 || '长度为2-36位',
          v => v.length <= 36 || '长度为2-36位',
        ],
        password: [
          v => !!v || 'Required',
          v => v.length >= 6 || '长度为6-36位',
          v => v.length <= 36 || '长度为6-36位',
        ],
      },
      edit: {
        nickname: '',
      },
    }
  },
  head() {
    return {
      info: {
        title: 'User Management',
        desc: 'User Management',
      },
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
    routes() {
      return this.$router.options.routes
    },
  },
  mounted() {
    this.getUser()
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      getUserDetail: 'user/getUserDetail',
      updateUser: 'user/updateUser',
      updateUserPassword: 'user/updateUserPassword',
      updateUserRole: 'user/updateUserRole',
    }),
    handleReset() {
      this.dialog = false
    },
    handleDelete({ id }) {
      console.log(id)
    },
    async handleChangeName({ id }) {
      const nickname = this.edit.nickname
      if (!id) {
        return
      }
      const { status } = await this.updateUser({ id, nickname })
      if (status === 1) {
        this.$dialog.message.success('Successfully modified', { position: 'top-right' })
      }
    },
  },
}
</script>
