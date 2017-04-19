import { Enum } from 'utils'
import { UserStore } from 'stores'
import { UserActions } from 'actions'
import { TextField } from 'components'
import { RaisedButton } from 'material-ui'

export default class Signin extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    onSwitchMode: React.PropTypes.func.isRequired,
    onAuthenticate: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    this.state = {
      loading: UserStore.getState().loading,
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    UserStore.listen(this.onChange)
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange)
  }

  onChange(state) {
    this.setState(state)
  }

  onInputChange(value, props) {
    let newState = {}
    newState[props.name] = value
    newState.errors = {}
    this.setState(newState)
  }

  onEnterKeyDown() {
    this.submitForm()
  }

  submitForm() {
    let valid = true

    let fields = ['SigninPassword', `Signin${this.signinField(true)}`]
    fields.forEach((ref, index) => {
      if(!this.refs[ref].isValid()) valid = false
    })

    if (valid) {
      let params = { password: this.state.password }
      params[this.signinField()] = this.state[this.signinField()]
      UserActions.signin(params, this.props.onAuthenticate)
    }
  }

  signinField(capitialize = false) {
    let field = ''
    if (config.signinField === undefined) field = 'email'

    if (config.signinField.indexOf('email') >= 0)
      field = 'email'
    else
      field = 'username'

    if (capitialize)
      return field.charAt(0).toUpperCase() + field.slice(1)
    else
      return field
  }

  render() {
    return (
      <div>
        not a {config.appName} user? <a onTouchTap={ this.props.onSwitchMode.bind(this, Enum.authenticateMode.SignUp) }>Sign up</a>
        <TextField
          value={this.state.email}
          defaultValue=''
          ref='SigninEmail'
          name='email'
          fullWidth={true}
          onEnterKeyDown={::this.onEnterKeyDown}
          serverErrorText={this.state.errors && this.state.errors.email  ? this.state.errors.email.join(', ') : null}
          floatingLabelText='Email'
          required={true}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          onChange={::this.onInputChange} />
        <TextField
          value={this.state.password}
          defaultValue=''
          ref='SigninPassword'
          name='password'
          type='password'
          fullWidth={true}
          onEnterKeyDown={::this.onEnterKeyDown}
          serverErrorText={this.state.errors && this.state.errors.password ? this.state.errors.password.join(', ') : null}
          floatingLabelText='Password'
          required={true}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          onChange={::this.onInputChange} />
        <div style={{ display: 'block', width: '100%', height: '5px' }}></div>
        <div className="signin__form__actions">
          <a onTouchTap={this.props.onSwitchMode.bind(this, Enum.authenticateMode.ForgottenPassword)} style={{ marginRight: '20px' }}>forgotten password</a>
          <RaisedButton disabled={this.state.loading === true} label="LOG IN" primary={true} onClick={::this.submitForm} />
        </div>
      </div>
    )
  }
}
