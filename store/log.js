import { Log, getUrl } from '~/api'

export const state = () => ({
  login: [],
})

export const mutations = {
  SET_LOGIN(state, login) {
    state.login = login
  },
}

export const getters = {
  login(state) {
    return state.login
  },
}

export const actions = {
  async getLoginLog({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(Log.login))
      commit('SET_LOGIN', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getLoginLogDetail({ commit }, { id }) {
    try {
      const res = await this.$axios.$get(`${getUrl(Log.login)}/${id}`)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
