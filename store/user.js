import { User, getUrl, Role } from '~/api'

export const state = () => ({
  list: [],
  accession: [],
})

export const mutations = {
  SET(state, list) {
    state.list = list
  },
  SET_ACCESSION(state, accession) {
    state.accession = accession
  },
}

export const getters = {
  user(state) {
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
}

export const actions = {
  async getUser({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(User.user))
      commit('SET', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getUserDetail({ dispatch }, { id, show = false }) {
    try {
      const res = await this.$axios.$get(`${getUrl(User.user)}/${id}`)
      dispatch('dialog/showUser', { user: res.data, show }, { root: true })
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getUserAccession({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(Role.accession))
      commit('SET_ACCESSION', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  // NOTE: 没有这个接口
  // async createUser({ dispatch }, { nickname, account, password }) {
  //   try {
  //     const res = await this.$axios.$post(getUrl(User.user), {
  //       nickname,
  //       account,
  //       password,
  //     })
  //     await dispatch('getUser')
  //     return res
  //   } catch (error) {
  //     console.error(error)
  //     return error
  //   }
  // },
  async updateUser({ dispatch }, { id, nickname, gender, avatar }) {
    try {
      const res = await this.$axios.$put(`${getUrl(User.user)}/${id}`, {
        nickname,
        gender,
        avatar,
      })
      await dispatch('getUser')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async updateUserPassword({ dispatch }, { id, password }) {
    try {
      const res = await this.$axios.$put(`${getUrl(User.user)}/${id}/password`, {
        password,
      },
      )
      await dispatch('getUser')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async updateUserRole({ dispatch }, { id, roles }) {
    try {
      const res = await this.$axios.$put(`${getUrl(User.user)}/${id}/roles`, {
        roles,
      })
      await dispatch('getUser')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  // NOTE: 没有这个接口
  // async deleteUser({ dispatch }, { id }) {
  //   try {
  //     const res = await this.$axios.$delete(`${getUrl(User.user)}/${id}`)
  //     await dispatch('getUser')
  //     return res
  //   } catch (error) {
  //     console.error(error)
  //     return error
  //   }
  // },
}
