import { getNodeRuntime } from '~/utils/runtime'
import pkg from '~/package.json'

const name = process.env.APP_NAME || pkg.name || 'Nuxt Vuetify Admin'

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, $axios, $token }) {
    commit('app/SET_NAME', name)
    commit('app/SET_VERSION', pkg.version)
    commit('app/SET_ENV', process.env.NODE_ENV)
    commit('app/SET_RUNTIME', getNodeRuntime())

    // !!!: 404 页面禁用初始化
    if (req.url.trim() === '/404') {
      return
    }

    // !!!: 验证token
    const token = $token.get()
    $axios.setToken(token)
    await dispatch('admin/getProfile')
  },
}
