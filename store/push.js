import { Push, getUrl } from '~/api'

export const actions = {
  async push({ commit }, { userIds, title, content, payload }) {
    try {
      const res = await this.$axios.$post(getUrl(Push.push), {
        user_ids: userIds,
        title,
        content,
        payload,
      })
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
