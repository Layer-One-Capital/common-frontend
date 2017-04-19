import { Enum, Analytics } from 'utils'
import { UserStore } from 'stores'
import { UserActions } from 'actions'
import { Signin, SignUp, ForgottenPassword, ChangePassword, ShopifyAuth, ResponsiveDialog } from 'components'
import { FlatButton, RaisedButton } from 'material-ui'

/*
  The responsibility of this component is to authenticate the user
  - sign in / sign up / forgot password

  By default it simply redirects to root when successfully authenticated
  If you'd like to do something different, see Plug in SEO v3's 'AuthenticateContainer' component as an example
  The onAuthenticate and onSignedUp events are your friends
*/
export default class Authenticate extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  static propTypes = {
    location: React.PropTypes.object.isRequired,
    resetToken: React.PropTypes.string,
    initialMode: React.PropTypes.number,
    signupTitle: React.PropTypes.string,
    signUpButtonLabel: React.PropTypes.string,
    onCancel: React.PropTypes.func,
    onAuthenticate: React.PropTypes.func,
    // if user signs up and the onSignedUp function is provided, onAuthenticate won't be called
    // if user signs up and the onSignedUp function is not provided, onAuthenticate will be called
    onSignedUp: React.PropTypes.func,
    onRequestShopifyAuth: React.PropTypes.func // ideally all Shopify auth will be in common in future, for now this workaround
  }

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      open: true,
      mode: typeof(this.props.initialMode) === 'undefined' ? Enum.authenticateMode.SignUp : this.props.initialMode
    }
  }

  componentDidMount() {
    // leaving these in until we have successfully deployed Blimpon without create job / signup issues
    // UserStore.listen(this.onChange)
    // if (this.props.primaryOtherRole && this.props.primaryOtherRole.defaultUser) {
    //   UserActions.fetchProfile.defer(this.props.primaryOtherRole.defaultUser)
    // }
  }

  componentWillUnmount() {
    //UserStore.unlisten(this.onChange)
  }

  onChange(state) {
    this.setState(state)
  }

  render() {
    let cancelButton = !this.props.onCancel ? null : <FlatButton label="cancel" onTouchTap={this.props.onCancel} />

    let title = []
    let titleText

    title.push(
      <div key="brandingbanner" className="branding-banner branding-banner--blimpon" style={{ backgroundColor: config.brandingColour, height: '60px', textAlign: 'center', overflow: 'hidden', padding: '10px' }}>
        <img style={ { maxWidth: '100%', maxHeight: '100%' } } src={config.logo} />
      </div>
      )

    if (this.props.onRequestShopifyAuth && this.state.mode !== Enum.authenticateMode.ShopifyAuth) {
      title.push(
        <div key="shopifysignin" style={{ padding: '24px 24px 0 24px' }}>
          <h2 style={{ marginBottom: '9px' }}>Shopify user?</h2>
          <RaisedButton primary={true}
            style={{ height: '69px' }}
            onTouchTap={ () => { this._onSwitchMode(Enum.authenticateMode.ShopifyAuth) } }
            label='Sign in with Shopify'
            icon={ <img src='https://dropshare-daniel.s3-eu-west-1.amazonaws.com/7GJVnhJR6g.png' style={{ maxHeight: '100%', padding: '9px 14px 9px 9px' }} /> }
          />
        </div>
      )
    }

    let onAuthenticate = this.props.onAuthenticate ? this.props.onAuthenticate : this.gotoNextPathOrRoot
    let onSignedUp = this.props.onSignedUp ? this.props.onSignedUp : null

    let actionComponent
    if (this.state.mode === Enum.authenticateMode.SignUp) {
      actionComponent = <SignUp buttonLabel={this.props.signUpButtonLabel}
        onSwitchMode={this._onSwitchMode.bind(this)}
        onAuthenticate={onAuthenticate.bind(this)}
        onSignedUp={onSignedUp ? onSignedUp.bind(this) : null} />
      titleText = typeof(this.props.signupTitle) === 'undefined' ? 'Sign up' : this.props.signupTitle
    } else if (this.state.mode === Enum.authenticateMode.SignIn) {
      actionComponent = <Signin onSwitchMode={this._onSwitchMode.bind(this)}
        onAuthenticate={onAuthenticate.bind(this)} />
      titleText = 'Log in'
    } else if (this.state.mode === Enum.authenticateMode.ForgottenPassword) {
      actionComponent = <ForgottenPassword onSwitchMode={this._onSwitchMode.bind(this)}
        onAuthenticate={onAuthenticate.bind(this)} />
      titleText = 'Forgotten password'
    } else if (this.state.mode === Enum.authenticateMode.ChangePassword) {
      actionComponent = <ChangePassword resetToken={this.props.resetToken}
        onSwitchMode={this._onSwitchMode.bind(this)} />
      titleText = 'Change password'
    } else if (this.state.mode === Enum.authenticateMode.ShopifyAuth) {
      actionComponent = <ShopifyAuth onSwitchMode={this._onSwitchMode.bind(this)} onRequestShopifyAuth={this.props.onRequestShopifyAuth.bind(this)} />
      titleText = 'Sign in with Shopify'
    }

    title.push(<h2 key="titletext" style={{ padding: '24px 24px 0 24px' }}>{titleText}</h2>)

    if (this.props.brandingCompany) {
      title.push(<div key="brandingnote" style={{ padding: '24px 24px 0 24px' }}>{this.props.brandingCompany.name} is using {config.appName} project management app to manage this job</div>)
    }

    return (
      <ResponsiveDialog
          title={title}
          open={this.state.open}
          onRequestClose={() => { this.setState({ open: false }) }}>
          {actionComponent}
      </ResponsiveDialog>
    )
  }

  _onSwitchMode(mode) {
    // we don't go through the router to change between these, so fake it for analytics tracking
    let fakePath =
      mode === Enum.authenticateMode.SignUp ? '/signup'
      : mode === Enum.authenticateMode.SignIn ? '/signin'
      : mode === Enum.authenticateMode.ForgottenPassword ? '/forgotten_password'
      : mode === Enum.authenticateMode.ChangePassword ? '/change_password'
      : mode === Enum.authenticateMode.ShopifyAuth ? '/shopify_auth'
      : undefined

    if (fakePath !== undefined) {
      Analytics.page({
        path: fakePath
      })
    }

    this.setState({ mode: mode })
  }

  gotoNextPathOrRoot() {
    let goto = this.props.location && this.props.location.state ? this.props.location.state.nextPathname : `/`
    this.context.router.push(goto)
  }
}
