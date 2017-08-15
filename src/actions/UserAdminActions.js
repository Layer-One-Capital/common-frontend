import alt from 'flux'
import { createActions } from 'alt-utils/lib/decorators'
import { UserAdminSource } from 'sources'
import moment from 'moment'

@createActions(alt)
export default class UserAdminActions {
  constructor() {
    this.generateActions(
      'setLoading',
      'setSearchResults'
    )
  }

  search(query) {
    const actions = this.actions || this

    actions.setSearchResults(null)
    actions.setLoading(true)

    return UserAdminSource.search(query).then((results) => {
      actions.setLoading(false)
      actions.setSearchResults(results)
    }).catch(resp => {
      alert('Oh, an error happened')
      actions.setLoading(false)
    })
  }

  makeRefund(params) {
    return UserAdminSource.makeRefund(params)
  }
}
