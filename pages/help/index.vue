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
          <template #item.id="{ item }">
            <z-dialog-activator
              :id="item.id"
              :text="item.id"
              type="help"
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
          width: 200,
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
        //   text: 'Content',
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
        title: 'Help Management',
        desc: 'Help Management',
      },
    }
  },
  computed: {
    ...mapGetters({
      help: 'help/help',
    }),
  },
  mounted() {
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
