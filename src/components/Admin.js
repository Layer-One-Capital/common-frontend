import React from 'react'
import moment from 'moment'
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

import { UserAdminStore } from 'stores'
import { UserAdminActions } from 'actions'
import { RefundDialog } from 'components'

export default class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleRefundDialogClose = this.handleRefundDialogClose.bind(this)
    this.handleRefundDialogOpen = this.handleRefundDialogOpen.bind(this)
    this.state = {
      loading: UserAdminStore.getState().loading,
      searchResults: UserAdminStore.getState().searchResults,
      refundDialogOpen: false,
      selectedUserId: null
    }
  }

  componentDidMount() {
    UserAdminStore.listen(this.onChange)
  }

  componentWillUnmount() {
    UserAdminStore.unlisten(this.onChange)
  }

  onChange(state) {
    this.setState(state)
  }

  handleRefundDialogOpen(userId=null) {
    this.setState({refundDialogOpen: true, selectedUserId: userId})
  }

  handleRefundDialogClose() {
    this.setState({refundDialogOpen: false, selectedUserId: null})
  }

  render() {
    let resultsComponent = null
    if (this.state.loading === false) {
      if (this.state.searchResults && this.state.searchResults.length > 0) {
        resultsComponent = this.renderResults(this.state.searchResults)
      } else {
        resultsComponent = <div>no results</div>
      }
    } else {
      resultsComponent = <LinearProgress mode="indeterminate" />
    }

    return (
      <div>
        <RefundDialog open={this.state.refundDialogOpen} userId={this.state.selectedUserId} onClose={this.handleRefundDialogClose}/>
        <TextField
          hintText="Search for email, website or Shopify domain"
          fullWidth={true}
          onKeyDown={ (e)=>{ if (e.key == 'Enter') { UserAdminActions.search(e.target.value) } } }
        />
        { resultsComponent }
      </div>
    )
  }

  renderResults(searchResults) {
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Shopify domain</TableHeaderColumn>
            <TableHeaderColumn>Website</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 170 }}>Active Charge</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 170 }}>First upgraded</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 100 }}></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            searchResults.map(result =>
              <TableRow key={result.id}>
                <TableRowColumn>
                    {result.email}
                </TableRowColumn>
                <TableRowColumn>
                    <a href={`//${result.shopify_domain}`} target='_new'>{result.shopify_domain}</a>
                </TableRowColumn>
                <TableRowColumn>
                    <a href={`${result.website}`} target='_new'>{result.website}</a>
                </TableRowColumn>
                <TableRowColumn style={{ width: 170 }}>
                    { result.active_charge === true ? <strong>Yes</strong> : result.first_charge_date ? 'free (cancelled)' : 'free' }
                </TableRowColumn>
                <TableRowColumn style={{ width: 170 }}>
                    { result.first_charge_date ? moment(result.first_charge_date).format('MMMM Do YYYY') : null }
                </TableRowColumn>
                <TableRowColumn style={{ width: 100 }}>
                  { result.shopify_domain != null &&
                    <a href="javascript:void(0)"><FontIcon onClick={this.handleRefundDialogOpen.bind(this, result.id)} className="material-icons">money_off</FontIcon></a>
                  }
                </TableRowColumn>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    )
  }
}
