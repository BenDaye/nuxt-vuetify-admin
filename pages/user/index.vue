<template>
  <v-container
    fluid
    class="fill-height flex-column align-stretch pa-6"
  >
    <z-page-header :meta="$metaInfo" />
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
          <template #item.username="{ item }">
            <v-avatar
              size="24px"
              class="mr-1"
            >
              <img
                v-if="item.avatar"
                :src="`${item.avatar}?height=48`"
                alt="Avatar"
              >
              <v-icon
                v-else
                color="default"
              >
                mdi-account-circle
              </v-icon>
            </v-avatar>
            {{ item.username }}
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
          <!-- // TODO: do something -->
          <!-- eslint-disable-next-line -->
          <template #item.actions="{ item }">
            <v-icon
              small
            >
              mdi-square-edit-outline
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
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
          text: '账号',
          align: 'left',
          value: 'username',
          width: 240,
        },
        // {
        //   text: '等级',
        //   align: 'center',
        //   value: 'level',
        // },
        // {
        //   text: '微信',
        //   align: 'left',
        //   value: 'wechat',
        // },
        {
          text: '手机号',
          align: 'left',
          value: 'phone',
        },
        {
          text: '邮箱',
          align: 'left',
          value: 'email',
        },
        // {
        //   text: '昵称',
        //   align: 'right',
        //   value: 'nickname',
        //   width: 240,
        // },
        // {
        //   text: '性别',
        //   align: 'center',
        //   value: 'gender',
        // },
        {
          text: '角色',
          align: 'center',
          value: 'role',
        },
        {
          text: '状态',
          align: 'center',
          value: 'status',
          width: 120,
        },
        {
          text: '创建时间',
          align: 'right',
          value: 'created_at',
          width: 120,
        },
        {
          text: '修改时间',
          align: 'right',
          value: 'updated_at',
          width: 120,
        },
        {
          text: '操作',
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
          v => !!v || '不能为空',
          v => v.length >= 6 || '长度为6-36位',
          v => v.length <= 36 || '长度为6-36位',
        ],
        nickname: [
          v => !!v || '不能为空',
          v => v.length >= 2 || '长度为2-36位',
          v => v.length <= 36 || '长度为2-36位',
        ],
        password: [
          v => !!v || '不能为空',
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
        title: '会员管理',
        desc: '管理会员',
      },
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      accession: 'user/accession',
    }),
    routes() {
      return this.$router.options.routes
    },
  },
  mounted() {
    this.getUser()
    this.getAccession()
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      getUserDetail: 'user/getUserDetail',
      updateUser: 'user/updateUser',
      updateUserPassword: 'user/updateUserPassword',
      updateUserRole: 'user/updateUserRole',
      getAccession: 'user/getUserAccession',
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
        this.$dialog.message.success('修改成功', {
          position: 'top-right',
          timeout: 1500,
        })
      }
    },
  },
}
</script>
