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
          :items="notification"
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
                @click="getNotification"
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
          text: '标题',
          align: 'left',
          value: 'title',
        },
        // {
        //   text: '内容',
        //   align: 'left',
        //   value: 'content',
        // },
        // {
        //   text: '备注',
        //   align: 'left',
        //   value: 'note',
        // },
        {
          text: '编辑者',
          align: 'left',
          value: 'author',
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
        title: 'Notification管理',
        desc: '管理Notification',
      },
    }
  },
  computed: {
    ...mapGetters({
      notification: 'notification/notification',
      admin: 'admin/admin',
    }),
  },
  mounted() {
    this.getNotification()
    this.getAdmin()
  },
  methods: {
    ...mapActions({
      getNotification: 'notification/getNotification',
      getNotificationDetail: 'notification/getNotificationDetail',
      createNotification: 'notification/createNotification',
      updateNotification: 'notification/updateNotification',
      deleteNotification: 'notification/deleteNotification',
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
