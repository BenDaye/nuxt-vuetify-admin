export default ({ $axios, redirect, store }) => {
  // $axios.onRequest((config) => {

  // })

  $axios.onResponse((response) => {
    if (response.config.url === '/api/login') {
      console.log(response.config)
    }
  })
}
