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
          <template #item.created_at="{ item }">
            {{ item.created_at | fmt }}
          </template>
          <template #item.updated_at="{ item }">
            {{ item.updated_at | fmt }}
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
        },
        {
          text: '管理员ID',
          align: 'left',
          value: 'author',
        },
        {
          text: '标题',
          align: 'left',
          value: 'title',
        },
        {
          text: '内容',
          align: 'left',
          value: 'content',
        },
        {
          text: '类型',
          align: 'left',
          value: 'type',
        },
        {
          text: '标签',
          align: 'center',
          value: 'tags',
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
    }),
  },
  mounted() {
    // TODO: 获取管理员信息与author匹配
    this.getHelp()
  },
  methods: {
    ...mapActions({
      getHelp: 'help/getHelp',
      getHelpDetail: 'help/getHelpDetail',
      createHelp: 'help/createHelp',
      updateHelp: 'help/updateHelp',
      deleteHelp: 'help/deleteHelp',
    }),
  },
}
</script>
