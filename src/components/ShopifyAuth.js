import { Enum } from 'utils'
import { UserStore } from 'stores'
import { UserActions } from 'actions'
import { TextField } from 'components'
import { RaisedButton } from 'material-ui'

export default class ShopifyAuth extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    onSwitchMode: React.PropTypes.func.isRequired,
    onRequestShopifyAuth: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.onRequestShopifyAuth()
  }

  render() {
    return (
      <p>
        Redirecting to Shopify sign in...
      </p>
    )
  }
}
