import alt from 'flux'
import { createStore, datasource, bind } from 'alt-utils/lib/decorators'
import { NoticeActions } from 'actions'

@createStore(alt)
export default class NoticeStore {
  constructor() {
    this.state = {
      notices: []
    }

    this.bindActions(NoticeActions);
  }
  
  static displayName = 'NoticeStore'

  setNotice(data) {
    this.setState({notices: [data]})
  }

  clearNotices() {
    this.setState({notices: []})
  }
}
