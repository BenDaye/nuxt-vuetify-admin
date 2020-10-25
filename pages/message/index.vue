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
          :items="message"
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
                @click="getMessage"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
              <v-spacer />
            </v-toolbar>
          </template>
          <template #item.id="{ item }">
            <v-btn
              color="info"
              text
              small
              @click.stop="getMessageDetail({ id: item.id, show: true })"
            >
              {{ item.id }}
            </v-btn>
          </template>
          <template #item.uid="{ item }">
            <v-btn
              color="info"
              text
              small
              @click.stop="getUserDetail({ id: item.uid, show: true })"
            >
              {{ getUserName(item.uid) }}
            </v-btn>
          </template>
          <template #item.read="{ item }">
            <v-chip
              :color="item.read | status('message', { color: true })"
              small
              label
            >
              {{ item.read | status('message') }}
            </v-chip>
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
          width: 240,
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
          text: '接收者',
          align: 'right',
          value: 'uid',
          width: 240,
        },
        {
          text: '状态',
          align: 'center',
          value: 'read',
          width: 120,
        },
        {
          text: '已读时间',
          align: 'right',
          value: 'read_at',
          width: 120,
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
      ],
    }
  },
  head() {
    return {
      info: {
        title: 'Message管理',
        desc: '管理Message',
      },
    }
  },
  computed: {
    ...mapGetters({
      message: 'message/message',
      user: 'user/user',
    }),
  },
  mounted() {
    this.getUser()
    this.getMessage()
  },
  methods: {
    ...mapActions({
      getMessage: 'message/getMessage',
      getMessageDetail: 'message/getMessageDetail',
      createMessage: 'message/createMessage',
      updateMessage: 'message/updateMessage',
      deleteMessage: 'message/deleteMessage',
      getUser: 'user/getUser',
      getUserDetail: 'user/getUserDetail',
    }),
    getUserName(id) {
      if (!id) {
        return
      }
      const _u = this.user.find(u => u.id === id)
      return _u ? _u.username : id
    },
  },
}
</script>
