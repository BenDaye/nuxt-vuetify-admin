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
          :items="admin"
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
                @click="getAdmin"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
              <v-spacer />
              <v-dialog
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

                          <!-- <v-col cols="12">
                            <v-autocomplete
                              v-model="form.accession"
                              :items="accession"
                              item-text="description"
                              item-value="name"
                              name="accession"
                              placeholder="权限"
                              cache-items
                              filled
                              multiple
                              dense
                              clearable
                            />
                          </v-col> -->
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
              </v-dialog>
            </v-toolbar>
          </template>
          <template #item.username="{ item }">
            <v-badge
              content="超管"
              :value="item.is_super"
              inline
              tile
              color="error"
            >
              <span>{{ item.username }}</span>
            </v-badge>
          </template>
          <template #item.name="{ item }">
            <v-edit-dialog
              :return-value.sync="edit.name"
              @save="handleChangeName(item)"
              @open="edit.name = item.name"
            >
              {{ item.name }}
              <v-icon small>
                mdi-square-edit-outline
              </v-icon>

              <template #input>
                <v-text-field
                  v-model="edit.name"
                  :rules="rules.name"
                  placeholder="昵称"
                  single-line
                />
              </template>
            </v-edit-dialog>
          </template>
          <template #item.status="{ item }">
            <v-chip
              :color="item.status | status('admin', { color: true })"
              small
              label
            >
              {{ item.status | status('admin') }}
            </v-chip>
          </template>
          <template #item.created_at="{ item }">
            {{ item.created_at | fmt('yyyy-MM-dd') }}
          </template>
          <template #item.updated_at="{ item }">
            {{ item.updated_at | fmt('yyyy-MM-dd') }}
          </template>
          <template #item.actions="{ item }">
            <v-menu
              v-if="item.username !== 'admin'"
              offset-y
              top
              left
            >
              <template #activator="{ on, attrs }">
                <v-icon
                  small
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-delete
                </v-icon>
              </template>

              <v-card>
                <v-card-title>
                  {{ `确认删除账号${item.username} ?` }}
                </v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    small
                    text
                  >
                    取消
                  </v-btn>
                  <v-btn
                    small
                    color="error"
                    depressed
                    @click="handleDelete(item)"
                  >
                    删除
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
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
          text: '昵称',
          align: 'right',
          value: 'name',
        },
        {
          text: '权限',
          align: 'right',
          value: 'accession',
        },
        {
          text: '状态',
          align: 'center',
          value: 'status',
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
        name: [
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
        name: '',
      },
    }
  },
  head() {
    return {
      info: {
        title: '管理员管理',
        desc: '管理管理员',
      },
    }
  },
  computed: {
    ...mapGetters({
      admin: 'admin/admin',
      accession: 'admin/accession',
    }),
    routes() {
      return this.$router.options.routes
    },
  },
  mounted() {
    this.getAdmin()
    this.getAccession()
  },
  methods: {
    ...mapActions({
      getAdmin: 'admin/getAdmin',
      getAdminDetail: 'admin/getAdminDetail',
      createAdmin: 'admin/createAdmin',
      createAdminTree: 'admin/createAdminTree',
      updateAdmin: 'admin/updateAdmin',
      deleteAdmin: 'admin/deleteAdmin',
      getAccession: 'admin/getAccession',
    }),
    async handleSave() {
      if (this.valid) {
        this.loading = true
        const { status } = await this.createAdmin(this.form)
        this.loading = false
        if (status === 1) {
          this.$dialog.message.success('新增成功', {
            position: 'top-right',
            timeout: 1500,
          })
          this.dialog = false
        }
      }
    },
    handleReset() {
      this.dialog = false
    },
    handleDelete({ id }) {
      console.log(id)
    },
    async handleChangeName({ id }) {
      const name = this.edit.name
      if (!id) {
        return
      }
      const { status } = await this.updateAdmin({ id, name })
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
