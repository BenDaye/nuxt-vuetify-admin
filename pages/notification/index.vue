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
          <template #item.id="{ item }">
            <z-dialog-activator
              :id="item.id"
              :text="item.id"
              type="news"
            />
          </template>
          <template #item.author="{ item }">
            <z-dialog-activator
              :id="item.author"
              :text="item.author"
              type="admin"
            />
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
          text: 'Admin',
          align: 'right',
          value: 'author',
          width: 240,
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
        title: 'Notification Management',
        desc: 'Notification Management',
      },
    }
  },
  computed: {
    ...mapGetters({
      notification: 'notification/notification',
    }),
  },
  mounted() {
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
