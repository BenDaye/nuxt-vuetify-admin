import Auth from './auth'
import Admin from './admin'
import User from './user'

export const getUrl = (url) => {
  return url ? `/api${url}` : undefined
}

export { Auth, Admin, User }
