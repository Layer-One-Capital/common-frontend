import { Enum } from 'utils'
import { UserStore } from 'stores'
import { UserActions } from 'actions'
import { Signin, SignUp, ForgottenPassword } from 'components'
import { FlatButton, Dialog } from 'material-ui'

export default class SignOut extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    onSignedOut: React.PropTypes.func
  }

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = { }
  }

  componentDidMount() {
    UserActions.signout(() => { this.context.router.push('/') })
    UserStore.listen(this.onChange)
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange)
  }

  onChange(state) {
    this.setState(state)
  }

  render() {
    return (
      <div>signing you out...</div>
    )
  }
}
