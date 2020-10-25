export const state = () => ({
  showMessage: false,
  message: undefined,
  showUser: false,
  user: undefined,
})

export const mutations = {
  SET_MESSAGE(state, message) {
    state.message = message
  },
  SHOW_MESSAGE(state, showMessage) {
    state.showMessage = showMessage
  },
  SET_USER(state, user) {
    state.user = user
  },
  SHOW_USER(state, showUser) {
    state.showUser = showUser
  },
}

export const getters = {
  message(state) {
    return state.message
  },
  showMessage(state) {
    return state.showMessage
  },
  user(state) {
    return state.user
  },
  showUser(state) {
    return state.showUser
  },
}

export const actions = {
  showMessage({ commit }, { message, show = false }) {
    commit('SET_MESSAGE', message)
    commit('SHOW_MESSAGE', show)
  },
  showUser({ commit }, { user, show = false }) {
    commit('SET_USER', user)
    commit('SHOW_USER', show)
  },
}
