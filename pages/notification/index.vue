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
          text: '备注',
          align: 'left',
          value: 'note',
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
        title: 'Notification管理',
        desc: '管理Notification',
      },
    }
  },
  computed: {
    ...mapGetters({
      notification: 'notification/notification',
    }),
  },
  mounted() {
    // TODO: 获取管理员信息与author匹配
    this.getNotification()
  },
  methods: {
    ...mapActions({
      getNotification: 'notification/getNotification',
      getNotificationDetail: 'notification/getNotificationDetail',
      createNotification: 'notification/createNotification',
      updateNotification: 'notification/updateNotification',
      deleteNotification: 'notification/deleteNotification',
    }),
  },
}
</script>
