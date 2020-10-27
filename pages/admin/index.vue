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
                    Create
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title primary-title>
                    Create Admin
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="valid">
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="form.account"
                              :rules="rules.account"
                              label="Account"
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
                              :rules="rules.name"
                              label="Nickname"
                              dense
                              filled
                              required
                              clearable
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="form.password"
                              :rules="rules.password"
                              label="Password"
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
                      Cancel
                    </v-btn>
                    <v-btn
                      color="primary"
                      text
                      :disabled="!valid"
                      :loading="loading"
                      @click="handleSave"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template #item.username="{ item }">
            <v-badge
              content="Super"
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
                  placeholder="Nickname"
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
                  {{ `Confirm delete account ${item.username} ?` }}
                </v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    small
                    text
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    small
                    color="error"
                    depressed
                    @click="handleDelete(item)"
                  >
                    Delete
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
          text: 'Account',
          align: 'left',
          value: 'username',
        },
        {
          text: 'Nickname',
          align: 'right',
          value: 'name',
        },
        {
          text: 'Accession',
          align: 'right',
          value: 'accession',
        },
        {
          text: 'Status',
          align: 'center',
          value: 'status',
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
          v => v.length >= 6 || 'Must be between 6 and 36',
          v => v.length <= 36 || 'Must be between 6 and 36',
        ],
        name: [
          v => !!v || 'Required',
          v => v.length >= 2 || 'Must be between 2 and 36',
          v => v.length <= 36 || 'Must be between 2 and 36',
        ],
        password: [
          v => !!v || 'Required',
          v => v.length >= 6 || 'Must be between 6 and 36',
          v => v.length <= 36 || 'Must be between 6 and 36',
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
        title: 'Admin Management',
        desc: 'Admin Management',
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
          this.$dialog.message.success('Successfully created', { position: 'top-right' })
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
        this.$dialog.message.success('Successfully modified', { position: 'top-right' })
      }
    },
  },
}
</script>
