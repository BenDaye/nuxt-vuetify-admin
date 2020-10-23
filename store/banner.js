import { Banner, getUrl } from '~/api'

export const state = () => ({
  list: [],
})

export const mutations = {
  SET(state, list) {
    state.list = list
  },
}

export const getters = {
  banner(state) {
    return state.list
  },
}

export const actions = {
  async getBanner({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(Banner.banner))
      commit('SET', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getBannerDetail({ commit }, { id }) {
    try {
      const res = await this.$axios.$get(`${getUrl(Banner.banner)}/${id}`)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async createBanner(
    { dispatch },
    { image, href, platform, description, priority, identifier, fallbackUrl },
  ) {
    try {
      const res = await this.$axios.$post(getUrl(Banner.banner), {
        image,
        href,
        platform,
        description,
        priority,
        identifier,
        fallback_url: fallbackUrl,
      })
      await dispatch('getBanner')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async updateBanner(
    { dispatch },
    {
      id,
      image,
      href,
      platform,
      description,
      priority,
      identifier,
      fallbackUrl,
    },
  ) {
    try {
      const res = await this.$axios.$put(`${getUrl(Banner.banner)}/${id}`, {
        image,
        href,
        platform,
        description,
        priority,
        identifier,
        fallback_url: fallbackUrl,
      })
      await dispatch('getBanner')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async deleteBanner({ dispatch }, { id }) {
    try {
      const res = await this.$axios.$delete(`${getUrl(Banner.banner)}/${id}`)
      await dispatch('getBanner')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
