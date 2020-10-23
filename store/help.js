import { Help, getUrl } from '~/api'

export const state = () => ({
  list: [],
})

export const mutations = {
  SET(state, list) {
    state.list = list
  },
}

export const getters = {
  help(state) {
    return state.list
  },
}

export const actions = {
  async getHelp({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(Help.help))
      commit('SET', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getHelpDetail({ commit }, { id }) {
    try {
      const res = await this.$axios.$get(`${getUrl(Help.help)}/${id}`)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async createHelp({ dispatch }, { type = 'help', title, content, tags = [], status = 1 }) {
    try {
      const res = await this.$axios.$post(getUrl(Help.help), {
        type,
        title,
        content,
        tags,
        status,
      })
      await dispatch('getHelp')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async updateHelp({ dispatch }, { id, type, title, content, tags, status }) {
    try {
      const res = await this.$axios.$put(`${getUrl(Help.help)}/${id}`, {
        type,
        title,
        content,
        tags,
        status,
      })
      await dispatch('getHelp')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async deleteHelp({ dispatch }, { id }) {
    try {
      const res = await this.$axios.$delete(`${getUrl(Help.help)}/${id}`)
      await dispatch('getHelp')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
