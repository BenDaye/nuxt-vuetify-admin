const CookieParse = require('cookie').parse
const ClientCookie = require('js-cookie')

class Cookie {
  constructor(context) {
    this.context = context
    this.key = 'Authorization'
  }

  set(token, expires = 7) {
    if (process.client) {
      ClientCookie.set(this.key, `Bearer ${token}`, { expires })
    }

    const res = this.context.res

    return res && res.setHeader(this.key, `Bearer ${token}`)
  }

  get() {
    if (process.client) {
      return ClientCookie.get(this.key)
    }

    const req = this.context.req

    if (!req) { return }

    const cookie = CookieParse(req.headers.cookie)

    const token = cookie[this.key]

    return token
  }

  remove() {
    if (process.client) {
      ClientCookie.remove(this.key)
    }

    const res = this.context.res

    return res && res.setHeader(this.key, '')
  }
}

export class Token {
  constructor(context) {
    this.context = context
    this.cookie = new Cookie(context)
  }

  get() {
    return this.cookie.get()
  }

  set(token) {
    this.cookie.set(token)
  }

  remove() {
    this.cookie.remove()
    this.context.store.commit('admin/SET_PROFILE', undefined)
    if (this.context.route.path !== '/auth/sign_in') {
      this.context.redirect('/auth/sign_in')
    }
  }
}
