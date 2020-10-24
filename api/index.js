import Auth from './auth'
import Admin from './admin'
import User from './user'
import Menu from './menu'
import Role from './role'
import Log from './log'
import Banner from './banner'
import Message from './message'
import Notification from './notification'
import News from './news'
import Help from './help'
import System from './system'
import Feedback from './feedback'
import Config from './config'
import Push from './push'
import Upload from './upload'
import Area from './area'

const proxy = process.env.API_PROXY || '/api/'

export const getUrl = (url) => {
  return url ? `${proxy}${url}` : undefined
}

export {
  Auth,
  Admin,
  User,
  Menu,
  Role,
  Log,
  Banner,
  Message,
  Notification,
  News,
  Help,
  System,
  Feedback,
  Config,
  Push,
  Upload,
  Area,
}
