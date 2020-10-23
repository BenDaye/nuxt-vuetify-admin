<template>
  <v-container
    fluid
    class="py-3"
  >
    <z-page-header :meta="$metaInfo" />
    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="user"
        >
          <template #top>
            <v-toolbar
              flat
            >
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
              <!-- <v-dialog
                v-model="dialog"
                max-width="500px"
                persistent
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    创建管理员
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title primary-title>
                    创建管理员
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="valid">
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="form.account"
                              name="account"
                              :rules="rules.account"
                              label="账号"
                              dense
                              filled
                              required
                              clearable
                              autofocus
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="form.name"
                              name="name"
                              :rules="rules.name"
                              label="昵称"
                              dense
                              filled
                              required
                              clearable
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="form.password"
                              name="password"
                              :rules="rules.password"
                              label="密码"
                              dense
                              filled
                              required
                              clearable
                              disabled
                              type="password"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="error"
                      text
                      @click="handleReset"
                    >
                      取消
                    </v-btn>
                    <v-btn
                      color="primary"
                      text
                      :disabled="!valid"
                      :loading="loading"
                      @click="handleSave"
                    >
                      保存
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->
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
            {{ item.created_at | fmt }}
          </template>
          <template #item.updated_at="{ item }">
            {{ item.updated_at | fmt }}
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
        // {
        //   text: 'ID',
        //   align: 'left',
        //   value: 'id',
        // },
        {
          text: '账号',
          align: 'left',
          value: 'username',
        },
        {
          text: '等级',
          align: 'center',
          value: 'level',
        },
        {
          text: '微信',
          align: 'left',
          value: 'wechat',
        },
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
        {
          text: '昵称',
          align: 'right',
          value: 'nickname',
        },
        {
          text: '性别',
          align: 'center',
          value: 'gender',
        },
        {
          text: '角色',
          align: 'center',
          value: 'role',
        },
        {
          text: '状态',
          align: 'center',
          value: 'status',
        },
        {
          text: '创建时间',
          align: 'center',
          value: 'created_at',
        },
        {
          text: '修改时间',
          align: 'center',
          value: 'updated_at',
        },
        {
          text: '操作',
          align: 'right',
          value: 'actions',
          sortable: false,
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