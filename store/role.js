import { getUrl, Role } from '~/api'

export const store = () => ({
  list: [],
})

export const mutations = {
  SET(state, list) {
    state.list = list
  },
}

export const getters = {
  role(state) {
    return state.list
  },
}

export const actions = {
  async getRole({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(Role.role))
      commit('SET', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getRoleDetail({ commit }, { name }) {
    try {
      const res = await this.$axios.$get(`${getUrl(Role.role)}/${name}`)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async createRole(
    { dispatch },
    { name, description, accession = [], note },
  ) {
    try {
      const res = await this.$axios.$post(getUrl(Role.role), {
        name,
        description,
        accession,
        note,
      })
      await dispatch('getRole')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async updateRole(
    { dispatch },
    { name, description, accession = [], note },
  ) {
    try {
      const res = await this.$axios.$put(`${getUrl(Role.role)}/${name}`, {
        description,
        accession,
        note,
      })
      await dispatch('getRole')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async deleteRole({ dispatch }, { name }) {
    try {
      const res = await this.$axios.$delete(`${getUrl(Role.role)}/${name}`)
      await dispatch('getRole')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
