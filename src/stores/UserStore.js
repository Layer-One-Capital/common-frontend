import alt from 'flux'
import { createStore, datasource, bind } from 'alt-utils/lib/decorators'
import { UserActions } from 'actions'
import { ApiHelper, Analytics } from 'utils'

@createStore(alt)
export default class UserStore {
  constructor() {
    this.state = {
      errors: {},
      loading: false,
      authenticated: false,
      forgottenPasswordEmailSent: false,
      passwordChanged: false,
      currentUser: {
        userId: null,
        email: null,
        accessToken: null
      }
    }

    this.bindActions(UserActions)

    let currentUser = localStorage.getItem('currentUser')
    if (currentUser)
      this.setCurrentUser(JSON.parse(currentUser))
  }

  static displayName = 'UserStore'

  setCurrentUser(data) {
    localStorage.setItem('currentUser', JSON.stringify(data))
    ApiHelper.setAuthHeader(data.accessToken)
    this.state.currentUser = data
    this.state.authenticated = true

    let traits = {}
    // suppress these from traits
    const blacklistTraits = ['accessToken','anonymous','id']
    for (let key in data) {
      if (blacklistTraits.indexOf(key) === -1) {
        // translate to legacy tracking traits
        if (key === 'website') {
          traits.primaryDomain = data[key]
        } else if (key === 'provider') {
          traits.product = data.anonymous === true ? 'Anonymous' : data[key] === null ? 'Direct' : data[key] === 'shopify' ? 'Shopify' : 'UNKNOWN'
        } else {
          traits[key] = data[key]
        }
      }
    }
    Analytics.reset() // the user may not have logged out before logging in as a different user, so reset their traits and ID here first
    Analytics.identify(data.id, traits)
  }

  unsetCurrentUser() {
    localStorage.removeItem('currentUser')
    ApiHelper.clearAuthHeader()
    this.state.currentUser = { accestokenToken : null }
    this.state.authenticated = false
    Analytics.reset()
  }

  setPasswordRequired(params) {
    this.state.requirePassword = typeof(params.requirePassword) !== 'undefined' ? params.requirePassword : true
    this.state.userConfirmed = params.userConfirmed
  }

  forgottenPasswordEmailSent(sent) {
    this.setState({ forgottenPasswordEmailSent: sent })
  }

  setPasswordChanged(changed) {
    this.setState({ passwordChanged: changed })
  }

  setLoading(loading) { this.setState({ loading }) }

  setErrors(errors) { this.setState({ errors }) }
}
