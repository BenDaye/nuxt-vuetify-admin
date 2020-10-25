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
          :items="banner"
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
                @click="getBanner"
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
  data() {
    return {
      headers: [
        {
          text: '图片',
          align: 'center',
          value: 'image',
        },
        {
          text: '跳转链接',
          align: 'center',
          value: 'href',
        },
        {
          text: '平台',
          align: 'center',
          value: 'platform',
        },
        {
          text: '描述',
          align: 'center',
          value: 'description',
        },
        {
          text: '排序',
          align: 'center',
          value: 'priority',
        },
        {
          text: 'App标识符',
          align: 'center',
          value: 'identifier',
        },
        {
          text: '备用标识',
          align: 'center',
          value: 'fallback_url',
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
        title: 'Banner管理',
        desc: '管理Banner',
      },
    }
  },
  computed: {
    ...mapGetters({
      banner: 'banner/banner',
    }),
  },
  mounted() {
    this.getBanner()
  },
  methods: {
    ...mapActions({
      getBanner: 'banner/getBanner',
      getBannerDetail: 'banner/getBannerDetail',
      createBanner: 'banner/createBanner',
      updateBanner: 'banner/updateBanner',
      deleteBanner: 'banner/deleteBanner',
    }),
  },
}
</script>
