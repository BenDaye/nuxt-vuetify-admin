import Vue from 'vue'

Vue.filter('status', function(value, type, opt = {}) {
  if (value === undefined) {
    return ''
  }

  const handler = {
    admin() {
      const { color } = opt
      if (color) {
        switch (value) {
          case 0:
            return 'success'
          case -1:
            return 'secondary'
          case -100:
            return 'error'
          default:
            return 'warning'
        }
      }
      switch (value) {
        case 0:
          return 'Activated'
        case -1:
          return 'Inactivated'
        case -100:
          return 'Forbidden'
        default:
          return 'Unknown'
      }
    },
    user() {
      const { color } = opt
      if (color) {
        switch (value) {
          case 1:
            return 'success'
          case -1:
            return 'secondary'
          case -100:
            return 'error'
          default:
            return 'warning'
        }
      }
      switch (value) {
        case 1:
          return 'Activated'
        case -1:
          return 'Inactivated'
        case -100:
          return 'Forbidden'
        default:
          return 'Unknown'
      }
    },
    news() {
      const { color } = opt
      if (color) {
        switch (value) {
          case 0:
            return 'success'
          default:
            return 'warning'
        }
      }
      switch (value) {
        case 0:
          return 'Activated'
        default:
          return 'Unknown'
      }
    },
    message() {
      const { color } = opt
      if (color) {
        switch (value) {
          case true:
            return 'success'
          default:
            return 'warning'
        }
      }
      switch (value) {
        case true:
          return 'read'
        default:
          return 'unread'
      }
    },
  }

  return type in handler ? handler[type].call(this) : value
})

// NOTE: 0: Short, 1: Full
Vue.filter('gender', function(value, f = 0) {
  if (value === undefined) {
    return ''
  }

  switch (value) {
    case 1:
      return f ? 'Man' : 'Male'
    case 2:
      return f ? 'Woman' : 'Female'
    default:
      return f ? 'Unknown' : 'None'
  }
})
