<template>
  <v-container
    fluid
    class="py-3"
  >
    <!-- // TODO: 接口似乎有bug -->
    <z-page-header :meta="$metaInfo" />
    <v-card>
      <v-card-text class="text-truncate">
        <v-data-table
          :headers="headers"
          :items="menu"
        >
          <template #top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>
                菜单管理
              </v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              />
              <v-btn
                icon
                @click="getMenu"
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
                    创建菜单
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title primary-title>
                    创建菜单
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="valid">
                      <v-container>
                        <v-row>
                          <v-col cols="8">
                            <v-text-field
                              v-model="form.name"
                              name="name"
                              :rules="rules.name"
                              placeholder="菜单名称"
                              dense
                              filled
                              required
                              clearable
                              autofocus
                            />
                          </v-col>
                          <v-col cols="4">
                            <v-text-field
                              v-model="form.icon"
                              name="icon"
                              :rules="rules.icon"
                              placeholder="图标"
                              filled
                              dense
                              clearable
                              disabled
                              :append-icon="form.icon"
                            />
                          </v-col>

                          <v-col cols="8">
                            <v-autocomplete
                              v-model="form.url"
                              :items="routes"
                              item-text="path"
                              item-value="path"
                              name="url"
                              placeholder="页面Url"
                              filled
                              dense
                              clearable
                            />
                          </v-col>
                          <v-col cols="4">
                            <v-text-field
                              v-model="form.sort"
                              name="sort"
                              :rules="rules.sort"
                              placeholder="排序"
                              filled
                              dense
                              type="number"
                            />
                          </v-col>

                          <v-col cols="12">
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
                          </v-col>

                          <v-col cols="12">
                            <v-text-field
                              v-model="form.parentId"
                              name="parentId"
                              :rules="rules.parentId"
                              placeholder="父级菜单"
                              filled
                              dense
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
                      @click="handleSave"
                    >
                      保存
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
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
          text: '菜单名称',
          align: 'center',
          value: 'name',
        },
        {
          text: 'Url',
          align: 'center',
          value: 'url',
        },
        {
          text: '图标',
          align: 'center',
          value: 'icon',
        },
        {
          text: '权限',
          align: 'center',
          value: 'accession',
        },
        {
          text: '排序',
          align: 'center',
          value: 'sort',
        },
        {
          text: '父级菜单',
          align: 'center',
          value: 'parent_id',
        },
      ],
      dialog: false,
      valid: false,
      form: {
        name: '',
        url: '',
        icon: 'mdi-file',
        accession: [],
        sort: 1,
        parentId: '',
      },
      rules: {
        name: [
          v => !!v || '不能为空',
          v => v.length >= 2 || '长度为2-8位',
          v => v.length <= 8 || '长度为2-8位',
        ],
        icon: [
        ],
        sort: [
          v => v > 0 || '排序必须大于0',
        ],
        parentId: [
        ],
      },
    }
  },
  head() {
    return {
      info: {
        title: '菜单管理',
        desc: '管理左侧导航菜单',
      },
    }
  },
  computed: {
    ...mapGetters({
      menu: 'menu/menu',
      accession: 'admin/accession',
    }),
    routes() {
      return this.$router.options.routes
    },
  },
  mounted() {
    this.getMenu()
    this.getAccession()
  },
  methods: {
    ...mapActions({
      getMenu: 'menu/getMenu',
      getMenuDetail: 'menu/getMenuDetail',
      createMenu: 'menu/createMenu',
      createMenuTree: 'menu/createMenuTree',
      updateMenu: 'menu/updateMenu',
      deleteMenu: 'menu/deleteMenu',
      getAccession: 'admin/getAccession',
    }),
    handleSave() {
      if (this.valid) {
        this.createMenu(this.form)
      }
    },
    handleReset() {
      this.dialog = false
    },
  },
}
</script>
