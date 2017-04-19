import axios from 'axios'
let authInterceptor = null

export default class ApiHelper {
  static setAuthHeader(accessToken) {
    if (authInterceptor !== null)
      axios.interceptors.request.eject(authInterceptor)

    authInterceptor = axios.interceptors.request.use(config => {
      config.headers['Authorization'] = accessToken
      return config
    })
  }

  static clearAuthHeader() {
    if (authInterceptor !== null)
      axios.interceptors.request.eject(authInterceptor)
  }

  static apiUrl(endpoint) {
    // safe backwards compatibility: remove once these added to package.json for Plug in SEO
    const apiUrls = config.apiUrls ? config.apiUrls : {
      "release": "https://api.pluginseo.com",
      "prerelease": "https://api-stage.pluginseo.com"
    }
    if (__PRERELEASE__)
      return `${ apiUrls.prerelease }/${ endpoint }`
    else if (__RELEASE__)
      return `${ apiUrls.release }/${ endpoint }`
    else
      return `http://localhost:${ __DEV_API_PORT__ }/${ endpoint }`
  }
}
