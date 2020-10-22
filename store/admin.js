import { Admin, getUrl } from '~/api'

export const state = () => ({
  profile: undefined,
})

export const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile
  },
}

export const actions = {
  async getProfile({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(Admin.profile))
      commit('SET_PROFILE', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
