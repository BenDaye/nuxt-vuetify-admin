export const state = () => ({
  version: '0.0.0',
  env: 'development',
  runtime: {},
})

export const mutations = {
  SET_VERSION(state, version = '0.0.0') {
    state.version = version
  },
  SET_ENV(state, env = 'development') {
    state.env = env
  },
  SET_RUNTIME(state, runtime = {}) {
    state.runtime = runtime
  },
}
