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
          :items="log"
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
                @click="getLog"
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
        // {
        //   text: 'ID',
        //   align: 'left',
        //   value: 'id',
        // },
        {
          text: '类型',
          align: 'center',
          value: 'type',
        },
        {
          text: '指令',
          align: 'center',
          value: 'command',
        },
        {
          text: 'IP',
          align: 'center',
          value: 'last_ip',
        },
        {
          text: '客户端',
          align: 'left',
          value: 'client',
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
        title: '登录日志',
        desc: '查看用户的登录日志列表',
      },
    }
  },
  computed: {
    ...mapGetters({
      log: 'log/login',
    }),
    routes() {
      return this.$router.options.routes
    },
  },
  mounted() {
    this.getLog()
  },
  methods: {
    ...mapActions({
      getLog: 'log/getLoginLog',
      getLogDetail: 'log/getLoginLogDetail',
    }),
  },
}
</script>
