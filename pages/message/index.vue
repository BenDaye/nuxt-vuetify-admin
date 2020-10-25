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
            <z-dialog-activator
              :id="item.id"
              :text="item.id"
              type="message"
            />
          </template>
          <template #item.uid="{ item }">
            <z-dialog-activator
              :id="item.uid"
              :text="item.uid"
              type="user"
            />
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
    }),
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    ...mapActions({
      getMessage: 'message/getMessage',
      getMessageDetail: 'message/getMessageDetail',
      createMessage: 'message/createMessage',
      updateMessage: 'message/updateMessage',
      deleteMessage: 'message/deleteMessage',
    }),
  },
}
</script>
