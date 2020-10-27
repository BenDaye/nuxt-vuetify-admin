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
          text: 'Title',
          align: 'left',
          value: 'title',
        },
        // {
        //   text: 'Content',
        //   align: 'left',
        //   value: 'content',
        // },
        // {
        //   text: 'Note',
        //   align: 'left',
        //   value: 'note',
        // },
        {
          text: 'User',
          align: 'right',
          value: 'uid',
          width: 240,
        },
        {
          text: 'Status',
          align: 'center',
          value: 'read',
          width: 120,
        },
        {
          text: 'ReadAt',
          align: 'right',
          value: 'read_at',
          width: 120,
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
      ],
    }
  },
  head() {
    return {
      info: {
        title: 'Message Management',
        desc: 'Message Management',
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
