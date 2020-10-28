import { System, getUrl } from '~/api'

export const state = () => ({
  name: 'Nuxt Vuetify Admin',
  version: '0.0.0',
  env: 'development',
  runtime: {},
  system: {},
})

export const mutations = {
  SET_NAME(state, name = 'Nuxt Vuetify Admin') {
    state.name = name
  },
  SET_VERSION(state, version = '0.0.0') {
    state.version = version
  },
  SET_ENV(state, env = 'development') {
    state.env = env
  },
  SET_RUNTIME(state, runtime = {}) {
    state.runtime = runtime
  },
  SET_SYSTEM(state, system = {}) {
    state.system = system
  },
}

export const getters = {
  name(state) {
    return state.name
  },
  version(state) {
    return state.version
  },
  env(state) {
    return state.env
  },
  system(state) {
    return state.system
  },
  runtime(state) {
    return state.runtime
  },
}

// ???: 验证runtime和system是否有必要同时存在
export const actions = {
  async getSystem({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(System.system))
      commit('SET_SYSTEM', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
