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
          :items="news"
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
                @click="getNews"
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
          <template #item.status="{ item }">
            <v-chip
              :color="item.status | status('news', { color: true })"
              small
              label
            >
              {{ item.status | status('news') }}
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
          text: 'Type',
          align: 'left',
          value: 'type',
        },
        {
          text: 'Title',
          align: 'left',
          value: 'title',
        },
        // {
        //   text: '内容',
        //   align: 'left',
        //   value: 'content',
        // },
        {
          text: 'Tags',
          align: 'center',
          value: 'tags',
        },
        {
          text: 'Admin',
          align: 'right',
          value: 'author',
          width: 240,
        },
        {
          text: 'Status',
          align: 'center',
          value: 'status',
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
        title: 'News Management',
        desc: 'News Management',
      },
    }
  },
  computed: {
    ...mapGetters({
      news: 'news/news',
    }),
  },
  mounted() {
    this.getNews()
  },
  methods: {
    ...mapActions({
      getNews: 'news/getNews',
      getNewsDetail: 'news/getNewsDetail',
      createNews: 'news/createNews',
      updateNews: 'news/updateNews',
      deleteNews: 'news/deleteNews',
    }),
  },
}
</script>
