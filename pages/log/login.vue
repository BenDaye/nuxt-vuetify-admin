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
  layout: 'child',
  data() {
    return {
      headers: [
        // {
        //   text: 'ID',
        //   align: 'left',
        //   value: 'id',
        // },
        {
          text: 'Type',
          align: 'center',
          value: 'type',
        },
        {
          text: 'CMD',
          align: 'center',
          value: 'command',
        },
        {
          text: 'IP',
          align: 'center',
          value: 'last_ip',
        },
        {
          text: 'Client',
          align: 'left',
          value: 'client',
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
        {
          text: 'Actions',
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
        title: 'Login Log',
        desc: 'View user login log list',
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
