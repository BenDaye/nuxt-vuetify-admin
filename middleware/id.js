export default ({ app, params, $dialog }) => {
  if (!params.id) {
    if (process.client) {
      $dialog.message.warning('缺少必要参数', { position: 'top-right' })
    }
    return app.$router.back()
  }
}
