import { Enum } from 'utils'
import { UserStore } from 'stores'
import { UserActions } from 'actions'
import { TextField } from 'components'
import { RaisedButton, FlatButton } from 'material-ui'

export default class ForgottenPassword extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    onSwitchMode: React.PropTypes.func.isRequired,
    onAuthenticate: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.onUserChange = this.onUserChange.bind(this)

    this.state = {
      errors: undefined,
      emailSent: false,
      email: '',
      loading: UserStore.getState().loading,
      forgottenPasswordEmailSent: UserStore.getState().forgottenPasswordEmailSent
    }
  }

  componentDidMount() {
    UserStore.listen(this.onUserChange)
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onUserChange)
  }

  onInputChange(value, props) {
    let newState = {}
    newState[props.name] = value
    newState.errors = {}
    this.setState(newState)
  }


  onUserChange(state) {
    this.setState(state)
  }

  onEnterKeyDown() {
    this.submitForm()
  }

  submitForm() {
    let valid = true

    let fields = ['ForgottenPasswordEmail']

    fields.forEach((ref, index) => {
      if( !this.refs[ref].isValid() ) valid = false
    })

    if (valid) {
      UserActions.forgotPassword(this.state.email)
    } else {
      // invalid
    }
  }

  render() {
    // <a onTouchTap={ this.props.onSwitchMode.bind(this, Enum.authenticateMode.SignIn) }>Sign in here once you&apos;ve reset your password</a>
    let helperText = <p></p>
    if (this.state.forgottenPasswordEmailSent === true) {
      return (
        <div>
          <h3>If {this.state.email} is a {config.appName} user an email has been sent.</h3>
          <p>Push the link in the email to create a new password</p>
        </div>
      )
    }

    return (
      <div>
          remembered your password? <a onTouchTap={ this.props.onSwitchMode.bind(this, Enum.authenticateMode.SignIn) }>Log in</a>
          <TextField
            value={this.state.email}
            defaultValue={this.state.email}
            ref='ForgottenPasswordEmail'
            key='forgottenpasswordemail'
            name='email'
            serverErrorText={ this.state.errors && this.state.errors.email  ? this.state.errors.email.join(', ') : null }
            floatingLabelText={ 'Email' }
            required={ true }
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck="false"
            onEnterKeyDown={::this.onEnterKeyDown}
            onChange={ this.onInputChange.bind(this) } />
          <div className="customer-signup__form__actions">
            <RaisedButton disabled={this.state.loading === true} label="REQUEST A NEW PASSWORD" primary={true} onClick={ this.submitForm.bind(this) } />
          </div>
        </div>
    )
  }
}
