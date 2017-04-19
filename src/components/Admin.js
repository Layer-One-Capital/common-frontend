import React from 'react'
import moment from 'moment'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  LinearProgress,
  TextField
} from 'material-ui'

import { UserAdminStore } from 'stores'
import { UserAdminActions } from 'actions'

export default class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      loading: UserAdminStore.getState().loading,
      searchResults: UserAdminStore.getState().searchResults
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
        <TextField
          hintText="Search for email, website or Shopify domain"
          fullWidth={true}
          onEnterKeyDown={ (e)=>{ UserAdminActions.search(e.target.value) } }
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
            <TableHeaderColumn style={{ width: 170 }}>Plus</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 170 }}>First upgraded</TableHeaderColumn>
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
                    { result.plus === true ? <strong>Plus</strong> : result.first_charge_date ? 'free (cancelled Plus)' : 'free' }
                </TableRowColumn>
                <TableRowColumn style={{ width: 170 }}>
                    { result.first_charge_date ? moment(result.first_charge_date).format('MMMM Do YYYY') : null }
                </TableRowColumn>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    )
  }
}
