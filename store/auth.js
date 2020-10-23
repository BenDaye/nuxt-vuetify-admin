import { getUrl, Auth } from '~/api'

export const getters = {
  authenticated(state, getters, rootState) {
    return !!rootState.admin.profile
  },
}

export const actions = {
  async handleLogin(
    { dispatch },
    { username, password, duration = 7 * 24 * 60 * 60 },
  ) {
    try {
      const res = await this.$axios.$post(getUrl(Auth.login), {
        username,
        password,
        duration,
      })
      await dispatch('admin/getProfile', undefined, { root: true })
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
