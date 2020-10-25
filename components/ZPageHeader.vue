<template>
  <div class="py-4">
    <div class="display-1">
      {{ title }}
    </div>
    <div class="mt-3">
      {{ desc }}
    </div>
    <z-breadcrumbs />
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default() {
        return { info: {} }
      },
    },
  },
  computed: {
    title() {
      return this.meta.info.title || 'page.head.info.title is missing'
    },
    desc() {
      return this.meta.info.desc || 'page.head.info.desc is missing'
    },
  },
}
</script>
