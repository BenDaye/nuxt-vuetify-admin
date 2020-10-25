import { capitalize } from '~/utils/common'

export const state = () => ({
  showAdmin: false,
  admin: undefined,
  showUser: false,
  user: undefined,
  showMessage: false,
  message: undefined,
  showNews: false,
  news: undefined,
  showNotification: false,
  notification: undefined,
})

export const mutations = {
  SET_ADMIN(state, admin) {
    state.admin = admin
  },
  SHOW_ADMIN(state, showAdmin) {
    state.showAdmin = showAdmin
  },
  SET_USER(state, user) {
    state.user = user
  },
  SHOW_USER(state, showUser) {
    state.showUser = showUser
  },
  SET_MESSAGE(state, message) {
    state.message = message
  },
  SHOW_MESSAGE(state, showMessage) {
    state.showMessage = showMessage
  },
  SET_NEWS(state, news) {
    state.news = news
  },
  SHOW_NEWS(state, showNews) {
    state.showNews = showNews
  },
  SET_NOTIFICATION(state, notification) {
    state.notification = notification
  },
  SHOW_NOTIFICATION(state, showNotification) {
    state.showNotification = showNotification
  },
}

export const getters = {
  admin(state) {
    return state.admin
  },
  showAdmin(state) {
    return state.showAdmin
  },
  user(state) {
    return state.user
  },
  showUser(state) {
    return state.showUser
  },
  message(state) {
    return state.message
  },
  showMessage(state) {
    return state.showMessage
  },
  news(state) {
    return state.news
  },
  showNews(state) {
    return state.showNews
  },
  notification(state) {
    return state.notification
  },
  showNotification(state) {
    return state.showNotification
  },
}

export const actions = {
  show({ state, dispatch }, { type, id }) {
    if (!type || !id) {
      return
    }

    if (!(type in state)) {
      // !dispatch了个寂寞
      return Promise.reject(new ReferenceError(`'${type}' store action is not defined`))
    }
    dispatch(
      `${type}/get${capitalize(type)}Detail`,
      { id, show: true },
      { root: true },
    )
  },
  showAdmin({ commit }, { admin, show = false }) {
    commit('SET_ADMIN', admin)
    commit('SHOW_ADMIN', show)
  },
  showUser({ commit }, { user, show = false }) {
    commit('SET_USER', user)
    commit('SHOW_USER', show)
  },
  showMessage({ commit }, { message, show = false }) {
    commit('SET_MESSAGE', message)
    commit('SHOW_MESSAGE', show)
  },
  showNews({ commit }, { news, show = false }) {
    commit('SET_NEWS', news)
    commit('SHOW_NEWS', show)
  },
  showNotification({ commit }, { notification, show = false }) {
    commit('SET_NOTIFICATION', notification)
    commit('SHOW_NOTIFICATION', show)
  },
}
