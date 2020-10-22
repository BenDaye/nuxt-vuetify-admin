import { Token } from '~/utils/token'

export default (context, inject) => {
  const token = new Token(context)
  inject('token', token)
}
