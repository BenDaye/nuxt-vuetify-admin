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
          text: 'Image',
          align: 'center',
          value: 'image',
        },
        {
          text: 'Href',
          align: 'center',
          value: 'href',
        },
        {
          text: 'Platform',
          align: 'center',
          value: 'platform',
        },
        {
          text: 'Desc',
          align: 'center',
          value: 'description',
        },
        {
          text: 'Sort',
          align: 'center',
          value: 'priority',
        },
        {
          text: 'Identifier',
          align: 'center',
          value: 'identifier',
        },
        {
          text: 'Fallback',
          align: 'center',
          value: 'fallback_url',
        },
      ],
    }
  },
  head() {
    return {
      info: {
        title: 'Banner Management',
        desc: 'Banner Management',
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
