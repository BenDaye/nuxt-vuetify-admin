import { Admin, getUrl } from '~/api'

export const state = () => ({
  list: [],
  accession: [],
  profile: undefined,
})

export const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile
  },
  SET(state, list) {
    state.list = list
  },
  SET_ACCESSION(state, accession) {
    state.accession = accession
  },
}

export const getters = {
  admin(state) {
    return state.list
  },
  accession(state) {
    return state.accession.map((a) => {
      const description = a.description.replace('有权限', '')
      return {
        ...a,
        description,
      }
    })
  },
  profile(state) {
    return state.profile
  },
}

export const actions = {
  async getAdmin({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(Admin.admin))
      commit('SET', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getAdminDetail({ dispatch }, { id, show = false }) {
    try {
      const res = await this.$axios.$get(`${getUrl(Admin.admin)}/${id}`)
      dispatch('dialog/showAdmin', { admin: res.data, show }, { root: true })
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async createAdmin({ dispatch }, { name, account, password }) {
    try {
      const res = await this.$axios.$post(getUrl(Admin.admin), {
        name,
        account,
        password,
      })
      await dispatch('getAdmin')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async updateAdmin({ dispatch }, { id, name, status, accession }) {
    try {
      const res = await this.$axios.$put(`${getUrl(Admin.admin)}/${id}`, {
        name,
        status,
        accession,
      })
      await dispatch('getAdmin')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async deleteAdmin({ dispatch }, { id }) {
    try {
      const res = await this.$axios.$delete(`${getUrl(Admin.admin)}/${id}`)
      await dispatch('getAdmin')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
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
  async getAccession({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(Admin.accession))
      commit('SET_ACCESSION', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
