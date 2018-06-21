import React from 'react'
import { UserActions } from 'actions'
import { ApiHelper } from 'utils'

export default class Promotion extends React.Component {
  static contextTypes = {
    currentUser: React.PropTypes.object.isRequired
  }

  static propTypes = {
    code: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { validCode: null }
  }

  componentWillMount() {
    UserActions.validatePromotion(this.props.code).then((params) => {
      this.setState({ validCode: params.data })
    })
  }

  render() {
    return(
      <div>
        {(() => {
          switch(this.state.validCode) {
            case true:
              return(
                <div>
                  Valid promotion buy
                  <form action = { ApiHelper.apiUrl('/charges') } method = "post">
                    <input type="hidden" id="access_token" name="access_token" value={this.props.currentUser}/>
                    <input type="submit" value="Buy with the promotion" />
                  </form>
                </div>
              )
            case false:
              return <div>Invalid promotion</div>
            default:
              return <div>Validating promotion</div>
          }
        })()}
      </div>
    )
  }
}
