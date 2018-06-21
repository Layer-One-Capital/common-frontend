import React from 'react'
import { SimpleDialog } from './'
import { UserActions } from 'actions'

export default class Charge extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired
  }

  static propTypes = {
    onClose: React.PropTypes.func.isRequired,
    event: React.PropTypes.string.isRequired,
    supportEmail: React.PropTypes.string.isRequired,
    successDestiny: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    const events = ['succeed', 'failed', 'declined']
    const event = this.props.event

    this.state = {
      event,
      showModal: events.includes(event),
      message: '',
      title: '',
      actionButtonLabel: 'Close'
    }
  }

  componentWillMount() {
    if (this.state.event === 'succeed') {
      this.setState({
        title: 'Charge succeeded!',
        message: (
          <div>
            <h2>
                You&apos;ll now be taken to { this.props.successDestiny }
            </h2>
          </div>
        ),
        actionButtonLabel: `Go to ${ this.props.successDestiny }`
      })
      UserActions.upgradeToPlus(this.context.currentUser)
    } else if (this.state.event === 'failed') {
      this.setState({
        title: 'Upgrade failed',
        message: `An error occurred. You have not been charged. Please email ${ this.props.supportEmail } with this error message`,
        actionButtonLabel: `I\'ve emailed ${ this.props.supportEmail }`
      })
    } else if (this.state.event === 'declined') {
      this.setState({
        title: 'Upgrade declined',
        message: (
          <div>
            <p>Charge declined. Have any questions before upgrading? Email us at <a href={`mailto:${ this.props.supportEmail }`}>{ this.props.supportEmail }</a> and we&apos;ll be happy to answer them</p>
          </div>
        ),
        actionButtonLabel: 'Close'
      })
    }
    else {
      this.context.router.push('/')
    }
  }

  render() {
    return (
      <SimpleDialog
        title={this.state.title}
        message={this.state.message}
        open={this.state.showModal}
        onClose={::this.props.onClose}
        modal={true}
        actionButtonLabel={this.state.actionButtonLabel}
      />
    )
  }
}
