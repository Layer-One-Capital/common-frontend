import alt from 'flux'
import { createStore, datasource, bind } from 'alt-utils/lib/decorators'
import { UserAdminActions } from 'actions'

@createStore(alt)
export default class UserAdminStore {
  constructor() {
    this.state = {
      loading: false,
      searchResults: null
    }
    this.bindActions(UserAdminActions)
  }

  static displayName = 'UserAdminStore'

  setSearchResults(searchResults) {
    this.setState({ searchResults })
  }

  setLoading(loading) { this.setState({ loading }) }
}
