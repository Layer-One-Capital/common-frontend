import React from 'react'
import moment from 'moment'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui'

import { PromotionAdminStore } from 'stores'
import { PromotionAdminActions } from 'actions'

export default class AdminPromotions extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = { promotions: [] }
    PromotionAdminActions.all();
  }

  componentDidMount() {
    PromotionAdminStore.listen(this.onChange)
  }

  componentWillUnmount() {
    PromotionAdminStore.unlisten(this.onChange)
  }

  onChange(state) {
    this.setState(state)
  }

  render() {
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Code</TableHeaderColumn>
            <TableHeaderColumn>Expiration Date</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            this.state.promotions.map(promotion =>
              <TableRow key={promotion.id}>
                <TableRowColumn>
                    {promotion.code}
                </TableRowColumn>
                <TableRowColumn >
                    { promotion.expiration_date ? moment(promotion.expiration_date).format('MMMM Do YYYY [at] hh:m') : null }
                </TableRowColumn>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    )
  }
}
