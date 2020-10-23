import Auth from './auth'
import Admin from './admin'
import User from './user'
import Menu from './menu'
import Role from './role'

export const getUrl = (url) => {
  return url ? `/api${url}` : undefined
}

export { Auth, Admin, User, Menu, Role }
