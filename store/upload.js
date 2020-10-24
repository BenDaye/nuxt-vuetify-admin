import { Upload, getUrl } from '~/api'

export const actions = {
  async uploadImage({ commit }, formData) {
    try {
      const res = await this.$axios.$post(getUrl(Upload.image), formData)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async uploadFile({ commit }, formData) {
    try {
      const res = await this.$axios.$post(getUrl(Upload.file), formData)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
