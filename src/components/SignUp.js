import { Enum } from 'utils'
import { UserActions } from 'actions'
import { UserStore } from 'stores'
import { TextField } from 'components'
import { RaisedButton } from 'material-ui'

export default class SignUp extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    buttonLabel: React.PropTypes.string,
    onSwitchMode: React.PropTypes.func.isRequired,
    onAuthenticate: React.PropTypes.func.isRequired,
    onSignedUp: React.PropTypes.func
  }

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    this.state = {
      errors: undefined,
      loading: UserStore.getState().loading
    }
  }

  componentDidMount() {
    UserStore.listen(this.onChange)
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange)
  }

  onInputChange(value, props) {
    let newState = {}
    newState[props.name] = value
    newState.errors = {}
    this.setState(newState)
  }

  onChange(state) {
    this.setState(state)
  }

  onEnterKeyDown() {
    this.submitForm()
  }

  submitForm() {
    let valid = true
    let params = {}

    config.signupFields.forEach(ref => {
      if(!this.refs[ref].isValid()) valid = false
      params[ref] = this.state[ref]
    })

    UserActions.signup(params, this.props.onAuthenticate, this.props.onSignedUp)
  }

  isAllowed(name) {
    return config.signupFields.indexOf(name) >= 0
  }

  render() {
    if (this.state.requirePassword === true && (this.state.userConfirmed === true || typeof(this.state.userConfirmed) === 'undefined')) {
      return (
        <div>
          <h3>
            This email address is already registered with {config.appName}. Please <a onTouchTap={this.props.onSwitchMode.bind(this, Enum.authenticateMode.SignIn)}>log in</a>
          </h3>
          <p>
            Or <a onTouchTap={() => {this.setState({ requirePassword: false })}}>sign up</a> with a different email address.
          </p>
        </div>
      )
    }
    if (this.state.requirePassword === true && this.state.userConfirmed === false) {
      return (
        <div>
          <h3>
            This email address is already registered with {config.appName}
          </h3>
          <p>
            <strong>An email has just been sent to {this.state.email} with a link to create a password.<br/>Press the link in the email to confirm your email and create a password.</strong>
          </p>
          <p>
            alternatively, you can <a onTouchTap={ this.props.onSwitchMode.bind(this, Enum.authenticateMode.SignIn) }>log in</a> or <a onTouchTap={ () => { this.setState({ requirePassword: false }) } }>sign up</a> with a different email address
          </p>
        </div>
      )
    }

    let buttonLabel = !this.props.buttonLabel ? "SIGN UP" : this.props.buttonLabel

    return (
        <div>
          already a {config.appName} user? <a onTouchTap={this.props.onSwitchMode.bind(this, Enum.authenticateMode.SignIn)}>Log in</a>
          { this.isAllowed('username') &&
            <TextField
              value={this.state.username}
              defaultValue=''
              ref='username'
              key='username'
              name='username'
              serverErrorText={this.state.errors && this.state.errors.username  ? this.state.errors.username.join(', ') : null}
              floatingLabelText={'Username'}
              required={true}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck="false"
              onEnterKeyDown={::this.onEnterKeyDown}
              onChange={this.onInputChange.bind(this)} />
          }
          { this.isAllowed('email') &&
            <TextField
              value={this.state.email}
              defaultValue=''
              ref='email'
              key='email'
              name='email'
              serverErrorText={this.state.errors && this.state.errors.email  ? this.state.errors.email.join(', ') : null}
              floatingLabelText={'Email'}
              required={true}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck="false"
              onEnterKeyDown={::this.onEnterKeyDown}
              onChange={this.onInputChange.bind(this)} />
          }
          <div style={{ display: 'block', width: '100%', height: '20px' }}></div>
          { this.isAllowed('name') &&
            <TextField
              value={this.state.name}
              defaultValue=''
              ref='name'
              key='name'
              name='name'
              serverErrorText={this.state.errors && this.state.errors.name ? this.state.errors.name.join(', ') : null}
              floatingLabelText={'Name'}
              required={true}
              onEnterKeyDown={::this.onEnterKeyDown}
              onChange={this.onInputChange.bind(this)}
              />
          }
          { this.isAllowed('website') &&
            <TextField
              value={this.state.website}
              defaultValue=''
              ref='website'
              key='website'
              name='website'
              serverErrorText={this.state.errors && this.state.errors.website ? this.state.errors.website.join(', ') : null}
              floatingLabelText={'Website'}
              required={true}
              onEnterKeyDown={::this.onEnterKeyDown}
              onChange={this.onInputChange.bind(this)}
              />
          }
          { this.isAllowed('password') &&
            <TextField
              value={this.state.password}
              defaultValue=''
              ref='password'
              key='password'
              type='password'
              name='password'
              serverErrorText={this.state.errors && this.state.errors.password ? this.state.errors.password.join(', ') : null}
              floatingLabelText={'Password'}
              required={true}
              onEnterKeyDown={::this.onEnterKeyDown}
              onChange={this.onInputChange.bind(this)} />
          }
          <div className="customer-signup__form__actions">
            <RaisedButton disabled={this.state.loading === true} label={buttonLabel} primary={true} onClick={this.submitForm.bind(this)} />
          </div>
        </div>
    )
  }
}
