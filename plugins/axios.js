import { getUrl, Auth } from '~/api'
class ResponseError extends Error {
  constructor(response, message) {
    super(message)
    for (const attr in response) {
      this[attr] = response[attr]
    }
  }
}
class Response {
  constructor(context, response) {
    this.context = context
    this.response = response
  }

  handleResponse() {
    const { data } = this.response
    if (!data) {
      return Promise.reject(new ResponseError(this.response, '未知错误'))
    }
    return this._handleResponseData(data)
  }

  _handleResponseData({ status, message, data, meta }) {
    switch (status) {
      case 999999:
        if (process.client) {
          this.context.$dialog.message.error(message, { position: 'top-right' })
        }
        this.context.$token.remove()
        this.context.$axios.setToken(false)
        return Promise.reject(new ResponseError(this.response, message))
      case 1:
        if (this.response.config.url === getUrl(Auth.login)) {
          this.context.$token.set(data.token)
          this.context.$axios.setToken(data.token, 'Bearer')
        }
        return Promise.resolve(this.response)
      default:
        if (process.client) {
          this.context.$dialog.notify.warning(message, {
            position: 'top-right',
            timeout: 3000,
          })
        }
        return Promise.reject(new ResponseError(this.response, message))
    }
  }
}

export default (context) => {
  // context.$axios.onRequest((config) => {
  //   if (process.client) {
  //     context.$axios.setToken(context.$token.get())
  //   }
  // })

  context.$axios.onResponse((response) => {
    const res = new Response(context, response)
    return res.handleResponse()
  })
}
