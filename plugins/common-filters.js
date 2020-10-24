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
          return '已启用'
        case -1:
          return '未激活'
        case -100:
          return '已禁用'
        default:
          return '未知状态'
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
          return '已启用'
        case -1:
          return '未激活'
        case -100:
          return '已禁用'
        default:
          return '未知状态'
      }
    },
    news() {
      const { color } = opt
      if (color) {
        switch (value) {
          case 0:
            return 'success'
          // case -1:
          //   return 'secondary'
          // case -100:
          //   return 'error'
          default:
            return 'warning'
        }
      }
      switch (value) {
        case 0:
          return '已启用'
        // case -1:
        //   return '未激活'
        // case -100:
        //   return '已禁用'
        default:
          return '未知状态'
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
    // case 0:
    //   return f ? '未知' : '无'
    case 1:
      return f ? '男性' : '男'
    case 2:
      return f ? '女性' : '女'
    default:
      return f ? '未知' : '无'
  }
})
