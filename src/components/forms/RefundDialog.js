import {
  FontIcon,
  LinearProgress,
  RaisedButton,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TextField,
} from 'material-ui'
import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui'

import { UserAdminActions } from 'actions'
import { ResponsiveDialog } from 'components'

export default class RefundDialog extends React.Component {
  constructor(props) {
    super(props)
    this.onValidSubmit = this.onValidSubmit.bind(this)
    this.handleRefundDialogClose = this.handleRefundDialogClose.bind(this)
    this.state = {
      refundOkOpen: false,
      loading: false,
      refundError: null
    }
  }

  onValidSubmit(refundParams) {
    refundParams["user_id"] = this.props.userId
    // refundParams["test"] = true
    this.setState({loading: true})
    UserAdminActions.makeRefund(refundParams).then((response) => {
      if (response.data.error_message) {
        let error = '';
        error = response.data.error_message.replace('Amount exceeded 30 day shop credit issue limit', "Error: Not refunded. The amount requested is greater than the amount the shop owner has paid for the app in the last 30 days. Check in your Shopify partner admin to see if we've already refunded them. If you haven't, you can enter a smaller amount and try again.")
        this.setState({refundError: error})
      }
      else
        this.setState({refundOkOpen: true})

      this.setState({loading: false})
    }).catch((response) => {
      let error = ''
      error = response.message.replace('Request failed with status code 500', 'Request failed with status code 500. Please do not retry and call developer team')
      this.setState({refundError: error, loading: false})
    })
  }

  handleRefundDialogClose() {
    this.setState({refundError: null, refundOkOpen: false})
    this.props.onClose()
  }

  render() {
    return (
      <div>
        <ResponsiveDialog
          autoScrollBodyContent
          title="Make a Refund"
          // actions={actions}
          modal={false}
          open={this.state.refundOkOpen ? false : this.props.open}
          onRequestClose={this.handleRefundDialogClose}
        >
          <Formsy.Form onValidSubmit={this.onValidSubmit}>
            <FormsyText
              floatingLabelText="Amount (USD)"
              defaultValue="20"
              name="amount"
              required
              validations='isNumeric'
              validationError='Please enter only numbers'
            />
            <br/>
            <FormsyText
              floatingLabelText="Reason"
              name="reason"
              required
            />
            <br/>
            <p style={{color: 'red'}}>{this.state.refundError}</p>
            <RaisedButton onTouchTap={this.handleRefundDialogClose} label='Cancel' style={{marginRight: 15}} />
            <RaisedButton type='submit' label='Refund' secondary disabled={this.state.loading}/>
          </Formsy.Form>
        </ResponsiveDialog>
        <ResponsiveDialog
          onRequestClose={this.handleRefundDialogClose}
          open={this.state.refundOkOpen}
          modal={false}
          actions={<RaisedButton label='OK' primary onTouchTap={this.handleRefundDialogClose}/>}
          >
          <p>Refund successful</p>
        </ResponsiveDialog>
      </div>
    )
  }
}
