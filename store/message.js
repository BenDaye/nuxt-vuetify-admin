import { Message, getUrl } from '~/api'

export const state = () => ({
  list: [],
})

export const mutations = {
  SET(state, list) {
    state.list = list
  },
}

export const getters = {
  message(state) {
    return state.list
  },
}

export const actions = {
  async getMessage({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(Message.message))
      commit('SET', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getMessageDetail({ commit }, { id }) {
    try {
      const res = await this.$axios.$get(`${getUrl(Message.message)}/${id}`)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async createMessage({ dispatch }, { uid, title, content }) {
    try {
      const res = await this.$axios.$post(getUrl(Message.message), {
        uid,
        title,
        content,
      })
      await dispatch('getMessage')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async updateMessage({ dispatch }, { id, title, content }) {
    try {
      const res = await this.$axios.$put(`${getUrl(Message.message)}/${id}`, {
        title,
        content,
      })
      await dispatch('getMessage')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async deleteMessage({ dispatch }, { id }) {
    try {
      const res = await this.$axios.$delete(`${getUrl(Message.message)}/${id}`)
      await dispatch('getMessage')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
