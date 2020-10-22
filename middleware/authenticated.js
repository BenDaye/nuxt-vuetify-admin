export default ({ store, redirect, $dialog }) => {
  if (!store.state.admin.profile) {
    if (process.client) {
      $dialog.message.warning('尚未登录或登录已过期', { position: 'top-right' })
    }
    return redirect('/auth/sign_in')
  }
}
