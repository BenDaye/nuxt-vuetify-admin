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
          :items="menu"
        >
          <template #top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>
                {{ $metaInfo.info.title }}
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
                    Add
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title primary-title>
                    Add Menu
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="valid">
                      <v-container>
                        <v-row>
                          <v-col cols="8">
                            <v-text-field
                              v-model="form.name"
                              :rules="rules.name"
                              placeholder="Name"
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
                              :rules="rules.icon"
                              placeholder="Icon"
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
                              placeholder="Url"
                              filled
                              dense
                              clearable
                            />
                          </v-col>
                          <v-col cols="4">
                            <v-text-field
                              v-model="form.sort"
                              :rules="rules.sort"
                              placeholder="Sort"
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
                              placeholder="Accession"
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
                              :rules="rules.parentId"
                              placeholder="ParentId"
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
                      Cancel
                    </v-btn>
                    <v-btn
                      color="primary"
                      text
                      :disabled="!valid"
                      @click="handleSave"
                    >
                      Save
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
// !!!: 接口似乎有BUG
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'center',
          value: 'name',
        },
        {
          text: 'Url',
          align: 'center',
          value: 'url',
        },
        {
          text: 'Icon',
          align: 'center',
          value: 'icon',
        },
        {
          text: 'Accession',
          align: 'center',
          value: 'accession',
        },
        {
          text: 'Sort',
          align: 'center',
          value: 'sort',
        },
        {
          text: 'ParentId',
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
          v => !!v || 'Required',
          v => v.length >= 2 || 'Must be no less than 2',
          v => v.length <= 8 || 'Must be less than 8',
        ],
        icon: [
        ],
        sort: [
          v => v > 0 || 'Sort must be greater than 0',
        ],
        parentId: [
        ],
      },
    }
  },
  head() {
    return {
      info: {
        title: 'Menu Management',
        desc: 'Edit the navigator in left drawer',
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
