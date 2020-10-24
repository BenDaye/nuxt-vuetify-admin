import { Feedback, getUrl } from '~/api'

export const state = () => ({
  list: [],
})

export const mutations = {
  SET(state, list) {
    state.list = list
  },
}

export const getters = {
  feedback(state) {
    return state.list
  },
}

export const actions = {
  async getFeedback({ commit }, { uid, type, status }) {
    try {
      const res = await this.$axios.$get(getUrl(Feedback.feedback), {
        uid,
        type,
        status,
      })
      commit('SET', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getFeedbackDetail({ commit }, { id }) {
    try {
      const res = await this.$axios.$get(`${getUrl(Feedback.feedback)}/${id}`)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  // async createFeedback({ dispatch }, { type = 'feedback', title, content, tags = [] }) {
  //   try {
  //     const res = await this.$axios.$post(getUrl(Feedback.feedback), {
  //       type,
  //       title,
  //       content,
  //       tags,
  //     })
  //     await dispatch('getFeedback')
  //     return res
  //   } catch (error) {
  //     console.error(error)
  //     return error
  //   }
  // },
  async updateFeedback({ dispatch }, { id, status, lock }) {
    try {
      const res = await this.$axios.$put(`${getUrl(Feedback.feedback)}/${id}`, {
        status,
        lock,
      })
      await dispatch('getFeedback')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  // async deleteFeedback({ dispatch }, { id }) {
  //   try {
  //     const res = await this.$axios.$delete(`${getUrl(Feedback.feedback)}/${id}`)
  //     await dispatch('getFeedback')
  //     return res
  //   } catch (error) {
  //     console.error(error)
  //     return error
  //   }
  // },
}
