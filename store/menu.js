import { getUrl, Menu } from '~/api'

export const store = () => ({
  list: [],
})

export const mutations = {
  SET(state, list) {
    state.list = list
  },
}

export const getters = {
  menu(state) {
    return state.list
  },
}

export const actions = {
  async getMenu({ commit }) {
    try {
      const res = await this.$axios.$get(getUrl(Menu.menu))
      commit('SET', res.data)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async getMenuDetail({ commit }, { id }) {
    try {
      const res = await this.$axios.$get(`${getUrl(Menu.menu)}/${id}`)
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async createMenu(
    { dispatch },
    { name, url, icon = 'mdi-file-edit', accession = [], sort, parentId },
  ) {
    try {
      const res = await this.$axios.$post(getUrl(Menu.menu), {
        name,
        url: `http://localhost:3000${url}`,
        icon,
        accession,
        sort,
        parent_id: parentId,
      })
      await dispatch('getMenu')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async createMenuTree(
    { dispatch },
    {
      name,
      url,
      icon = 'mdi-file-edit',
      accession = [],
      sort,
      parentId,
      children,
    },
  ) {
    try {
      const res = await this.$axios.$post(getUrl(Menu.tree), {
        name,
        url,
        icon,
        accession,
        sort,
        parent_id: parentId,
        children,
      })
      await dispatch('getMenu')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async updateMenu(
    { dispatch },
    { id, name, url, icon = 'mdi-file-edit', accession = [], sort, parentId },
  ) {
    try {
      const res = await this.$axios.$put(`${getUrl(Menu.menu)}/${id}`, {
        name,
        url,
        icon,
        accession,
        sort,
        parent_id: parentId,
      })
      await dispatch('getMenu')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async deleteMenu({ dispatch }, { id }) {
    try {
      const res = await this.$axios.$delete(`${getUrl(Menu.menu)}/${id}`)
      await dispatch('getMenu')
      return res
    } catch (error) {
      console.error(error)
      return error
    }
  },
}
