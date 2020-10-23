import { News, getUrl } from '~/api'

export const state = () => ({
  list: [],
})

export const mutations = {
  SET(state, list) {
    state.list = list
  },
}

export const getters = {
  news(state) {
    return state.list
  },
}

export const actions = {
  async getNews({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(News.news))
      commit('SET', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getNewsDetail({ commit }, { id }) {
    try {
      const res = await this.$axios.$get(`${getUrl(News.news)}/${id}`)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async createNews({ dispatch }, { type = 'news', title, content, tags = [] }) {
    try {
      const res = await this.$axios.$post(getUrl(News.news), {
        type,
        title,
        content,
        tags,
      })
      await dispatch('getNews')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async updateNews({ dispatch }, { id, type, title, content, tags }) {
    try {
      const res = await this.$axios.$put(`${getUrl(News.news)}/${id}`, {
        type,
        title,
        content,
        tags,
      })
      await dispatch('getNews')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async deleteNews({ dispatch }, { id }) {
    try {
      const res = await this.$axios.$delete(`${getUrl(News.news)}/${id}`)
      await dispatch('getNews')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
