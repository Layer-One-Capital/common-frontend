import { Enum } from 'utils'
import { UserStore } from 'stores'
import { UserActions } from 'actions'
import { TextField } from 'components'

import {
  Paper,
  RaisedButton,
  FlatButton
} from 'material-ui'

export default class ChangePassword extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  static propTypes = {
    resetToken: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {}
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

    let fields = ['ChangePasswordPassword', 'ChangePasswordConfirmation']
    fields.forEach((ref, index) => {
      if( !this.refs[ref].isValid() ) valid = false
    })

    if (valid) {
      let params = {
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation
      }

      UserActions.changePassword(
        this.props.resetToken,
        params
      )
    } else {
      //alert('not valid')
    }
  }

  render() {

    if (this.state.passwordChanged === true) {
      return (
        <div>
          <h3>Password successfully changed</h3>
          <a onTouchTap={ this.props.onSwitchMode.bind(this, Enum.authenticateMode.SignIn) }>Sign in here with your new password</a>
        </div>
      )
    }

    let errors = null
    if (this.state.errors && this.state.errors.resetPasswordToken) {
      errors = (
        <div>
          <h3>Cannot change password: likely the email link has expired <small>({ `Token ${this.state.errors.resetPasswordToken.join(', ')}` })</small></h3>
          <p><a onTouchTap={this.props.onSwitchMode.bind(this, Enum.authenticateMode.ForgottenPassword)}>Request a new link by email</a></p>
        </div>
      )
    }

    return (
      <div>
        {errors}
        <TextField
          value={this.props.name}
          defaultValue=''
          ref='ChangePasswordPassword'
          name='password'
          type='password'
          style={ { width: "90%" } }
          serverErrorText={ this.state.errors && this.state.errors.password ? this.state.errors.password.join(', ') : null }
          floatingLabelText={ 'New Password (required)' }
          required={ true }
          onChange={ this.onInputChange.bind(this) }
          onEnterKeyDown={::this.onEnterKeyDown} />
        <TextField
          value={this.props.name}
          defaultValue=''
          ref='ChangePasswordConfirmation'
          name='passwordConfirmation'
          type='password'
          style={ { width: "90%" } }
          serverErrorText={ this.state.errors && this.state.errors.passwordConfirmation ? this.state.errors.passwordConfirmation.join(', ') : null }
          floatingLabelText={ 'Password Confirmation (required)' }
          required={ true }
          onChange={ this.onInputChange.bind(this) }
          onEnterKeyDown={::this.onEnterKeyDown} />
        <div className="change-password__form__actions">
          <RaisedButton label="CHANGE PASSWORD" primary={true} onClick={ this.submitForm.bind(this) } />
        </div>
      </div>
    )
  }
}
