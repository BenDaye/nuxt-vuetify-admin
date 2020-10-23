import Vue from 'vue'
import { format } from 'date-fns'

Vue.filter('fmt', function(value, f = 'yyyy-MM-dd HH:mm:ss') {
  if (!value) {
    return ''
  }
  return format(new Date(value), f)
})
