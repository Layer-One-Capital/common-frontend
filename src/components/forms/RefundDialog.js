import {
  Dialog,
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

  onValidSubmit(data) {
    data["user_id"] = this.props.userId
    this.setState({loading: true})
    UserAdminActions.makeRefund(data).then((data) => {
      this.setState({loading: false, refundOkOpen: true})
    }).catch((error) => {
      this.setState({refundError: error.response.data, loading: false})
    })
  }

  handleRefundDialogClose() {
    this.setState({refundError: null, refundOkOpen: false})
    this.props.onClose()
  }

  render() {
    return (
      <div>
        <Dialog
          autoScrollBodyContent
          title="Make a Refund"
          // actions={actions}
          modal={false}
          open={this.state.refundOkOpen ? false : this.props.open}
          onRequestClose={this.handleRefundDialogClose}
        >
          <Formsy.Form onValidSubmit={this.onValidSubmit}>
            <FormsyText
              floatingLabelText="Amount"
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
        </Dialog>
        <Dialog
          onRequestClose={this.handleRefundDialogClose}
          open={this.state.refundOkOpen}
          modal={false}
          actions={<RaisedButton label='OK' onTouchTap={this.handleRefundDialogClose}/>}
          >
          <p>Refund successful</p>
        </Dialog>
      </div>
    )
  }
}
