import alt from 'flux'
import { createActions } from 'alt-utils/lib/decorators'
import { UserSource } from 'sources'
import { Analytics } from 'utils'

@createActions(alt)
export default class UserActions {
  constructor() {
    this.generateActions(
      'setLoading',
      'setErrors',
      'setCurrentUser',
      'unsetCurrentUser',
      'setPasswordRequired',
      'setPasswordChanged',
      'forgottenPasswordEmailSent'
    )
  }

  signin(params, onAuthenticate) {
    const actions = this.actions || this // NOTE: this is because we mix alt versions between Blimpon and v3, so the 'actions' reference is different in each

    actions.setLoading(true)
    actions.setErrors({})

    return UserSource.signin(params).then(({ session }) => {
      actions.setLoading(false)
      actions.setErrors({})
      actions.setCurrentUser(session)

      Analytics.track('Logged in', {
        'logon method': session.provider || 'form'
      })

      if(onAuthenticate) onAuthenticate()
    }).catch((response) => {
      actions.setLoading(false)
      let track = 'Logon errored'
      // current mismatch between return types for Blimpon and Plug in SEO, so normalize here
      response = response && response.response ? response.response : response
      if (response && response.status == 422) {
        // 422 is expected if the username/password is incorrect
        track = 'Logon invalid'
        const ex = response.data
        if (ex && ex.meta && ex.meta.errors)
          actions.setErrors(ex.meta.errors)
      }
      Analytics.track(track, {
        'logon method': 'form'
      })
    })
  }

  signout(onSignedOut) {
    const actions = this.actions || this
    actions.unsetCurrentUser()
    if(onSignedOut) onSignedOut()
    return true
  }

  signup(params, onAuthenticate, onSignedUp) {
    const actions = this.actions || this

    actions.setLoading(true)
    actions.setErrors({})

    return UserSource.signup(params).then(data => {
      actions.setErrors({})
      actions.setLoading(false)

      if (data.meta.signupSuccess === false) {
        let error = ''

        if (!data.meta.errors) {
          actions.setPasswordRequired({ userConfirmed: data.meta.confirmed })
        } else {
          const errors = data.meta.errors
          actions.setErrors(errors)
          error = errors[Object.keys(errors)[0]][0]
        }

        Analytics.track('Register invalid', {
          'register invalid response': error,
          'registration method': 'form'
        })
      } else {
        actions.setCurrentUser(data.session)
        if (data.session.anonymous === false) {
          Analytics.track('Registered', {
            'registration method': 'form'
          })
        }
        if (onSignedUp && onSignedUp !== null) {
          onSignedUp(params)
        } else if (onAuthenticate) {
          onAuthenticate()
        }
      }
    }).catch((ex) => {
      actions.setLoading(false)

      Analytics.track('Register errored', {
        'registration method': 'form'
      })
    })
  }

  forgotPassword(email) {
    const actions = this.actions || this

    actions.setLoading(true)
    actions.setErrors({})

    return UserSource.forgotPassword(email).then(() => {
      actions.setLoading(false)
      actions.forgottenPasswordEmailSent(true)
    }).catch(() => {
      actions.setLoading(false)
    })
  }

  changePassword(token, params) {
    const actions = this.actions || this

    actions.setPasswordChanged(false)
    actions.setLoading(true)
    actions.setErrors({})

    return UserSource.changePassword(token, params).then(() => {
      actions.setLoading(false)
      actions.setPasswordChanged(true)
      //router.push(`${config.signinPath}?msg=pch`);
    }).catch(resp => {
      const data = resp.response.data

      actions.setPasswordChanged(false)
      actions.setLoading(false)
      actions.setErrors(data.meta.errors)
    })
  }

  // ExtendedUserActions calls its own API method to update the DB with extended user properties,
  //  then calls this method to update the entire user in local storage and the UserStore
  setExtendedUser(user) {
    const actions = this.actions || this
    actions.setCurrentUser(user)
    return true
  }
}
