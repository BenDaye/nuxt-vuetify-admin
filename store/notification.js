import { Notification, getUrl } from '~/api'

export const state = () => ({
  list: [],
})

export const mutations = {
  SET(state, list) {
    state.list = list
  },
}

export const getters = {
  notification(state) {
    return state.list
  },
}

export const actions = {
  async getNotification({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(Notification.notification))
      commit('SET', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getNotificationDetail({ commit }, { id }) {
    try {
      const res = await this.$axios.$get(
        `${getUrl(Notification.notification)}/${id}`,
      )
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async createNotification({ dispatch }, { note, title, content }) {
    try {
      const res = await this.$axios.$post(getUrl(Notification.notification), {
        note,
        title,
        content,
      })
      await dispatch('getNotification')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async updateNotification({ dispatch }, { id, title, content, note }) {
    try {
      const res = await this.$axios.$put(
        `${getUrl(Notification.notification)}/${id}`,
        {
          title,
          content,
          note,
        },
      )
      await dispatch('getNotification')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async deleteNotification({ dispatch }, { id }) {
    try {
      const res = await this.$axios.$delete(
        `${getUrl(Notification.notification)}/${id}`,
      )
      await dispatch('getNotification')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
