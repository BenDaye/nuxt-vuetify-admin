<template>
  <v-container
    fluid
    class="py-3"
  >
    <z-page-header :meta="$metaInfo" />
    <v-card>
      <v-card-text class="text-truncate">
        <v-data-table
          :headers="headers"
          :items="help"
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
                @click="getHelp"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
              <v-spacer />
            </v-toolbar>
          </template>
          <template #item.author="{ item }">
            {{ getAdminName(item.author) }}
          </template>
          <template #item.created_at="{ item }">
            {{ item.created_at | fmt('yyyy-MM-dd') }}
          </template>
          <template #item.updated_at="{ item }">
            {{ item.updated_at | fmt('yyyy-MM-dd') }}
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
          width: 200,
        },
        {
          text: '类型',
          align: 'left',
          value: 'type',
        },
        {
          text: '标题',
          align: 'left',
          value: 'title',
        },
        // {
        //   text: '内容',
        //   align: 'left',
        //   value: 'content',
        // },
        {
          text: '标签',
          align: 'center',
          value: 'tags',
        },
        {
          text: '编辑者',
          align: 'left',
          value: 'author',
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
    }
  },
  head() {
    return {
      info: {
        title: 'Help管理',
        desc: '管理Help',
      },
    }
  },
  computed: {
    ...mapGetters({
      help: 'help/help',
      admin: 'admin/admin',
    }),
  },
  mounted() {
    this.getHelp()
    this.getAdmin()
  },
  methods: {
    ...mapActions({
      getHelp: 'help/getHelp',
      getHelpDetail: 'help/getHelpDetail',
      createHelp: 'help/createHelp',
      updateHelp: 'help/updateHelp',
      deleteHelp: 'help/deleteHelp',
      getAdmin: 'admin/getAdmin',
    }),
    getAdminName(id) {
      if (!id) { return }
      const _a = this.admin.find(a => a.id === id)
      return _a ? _a.username : id
    },
  },
}
</script>
