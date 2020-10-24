import { Area, getUrl } from '~/api'

export const state = () => ({
  list: [],
})

export const mutations = {
  SET(state, list) {
    state.list = list
  },
}

export const getters = {
  area(state) {
    return state.list
  },
}

export const actions = {
  async getArea({ commit }, { simple = true, flatten = false }) {
    try {
      const res = await this.$axios.$get(getUrl(Area.area), { simple, flatten })
      commit('SET', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getAreaProvinces({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(Area.provinces))
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getAreaDetail({ commit }, code) {
    try {
      const res = await this.$axios.$get(`${getUrl(Area.area)}/${code}`)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getAreaChildren({ commit }, code) {
    try {
      const res = await this.$axios.$get(getUrl(Area.children(code)))
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
