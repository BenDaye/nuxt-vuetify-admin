import Vue from 'vue'
import { Gender, Status } from '~/constants'

Vue.filter('status', function(value, type, opt = {}) {
  if (value === undefined) {
    return ''
  }

  const handler = {
    admin() {
      const { color } = opt
      if (color) {
        switch (value) {
          case Status.ADMIN.ACTIVATED:
            return Status.ADMIN_COLOR.ACTIVATED
          case Status.ADMIN.DEACTIVATED:
            return Status.ADMIN_COLOR.DEACTIVATED
          case Status.ADMIN.FORBIDDEN:
            return Status.ADMIN_COLOR.FORBIDDEN
          default:
            return Status.UNKNOWN_COLOR
        }
      }
      switch (value) {
        case Status.ADMIN.ACTIVATED:
          return Status.ADMIN_TEXT.ACTIVATED
        case Status.ADMIN.DEACTIVATED:
          return Status.ADMIN_TEXT.DEACTIVATED
        case Status.ADMIN.FORBIDDEN:
          return Status.ADMIN_TEXT.FORBIDDEN
        default:
          return Status.UNKNOWN_TEXT
      }
    },
    user() {
      const { color } = opt
      if (color) {
        switch (value) {
          case Status.USER.ACTIVATED:
            return Status.USER_COLOR.ACTIVATED
          case Status.USER.DEACTIVATED:
            return Status.USER_COLOR.DEACTIVATED
          case Status.USER.FORBIDDEN:
            return Status.USER_COLOR.FORBIDDEN
          default:
            return Status.UNKNOWN_COLOR
        }
      }
      switch (value) {
        case Status.USER.ACTIVATED:
          return Status.USER_TEXT.ACTIVATED
        case Status.USER.DEACTIVATED:
          return Status.USER_TEXT.DEACTIVATED
        case Status.USER.FORBIDDEN:
          return Status.USER_TEXT.FORBIDDEN
        default:
          return Status.UNKNOWN_TEXT
      }
    },
    news() {
      const { color } = opt
      if (color) {
        switch (value) {
          case Status.NEWS.ACTIVATED:
            return Status.NEWS_COLOR.ACTIVATED
          default:
            return Status.UNKNOWN_COLOR
        }
      }
      switch (value) {
        case Status.NEWS.ACTIVATED:
          return Status.NEWS_TEXT.ACTIVATED
        default:
          return Status.UNKNOWN_TEXT
      }
    },
    message() {
      const { color } = opt
      if (color) {
        return value ? Status.MESSAGE_COLOR.READ : Status.MESSAGE_COLOR.UNREAD
      }
      return value ? Status.MESSAGE_TEXT.READ : Status.MESSAGE_TEXT.UNREAD
    },
  }

  return type in handler ? handler[type].call(this) : value
})

// ???: 0: Short, 1: Full
Vue.filter('gender', function(value, f = 0) {
  if (value === undefined) {
    return ''
  }

  switch (value) {
    case Gender.GENDER.MALE:
      return f ? Gender.TEXT_FULL.MALE : Gender.TEXT.MALE
    case Gender.GENDER.FEMALE:
      return f ? Gender.TEXT_FULL.FEMALE : Gender.TEXT.FEMALE
    default:
      return f ? Gender.TEXT_FULL.UNKNOWN : Gender.TEXT.UNKNOWN
  }
})
