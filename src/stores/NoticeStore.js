import alt from 'flux'
import { createStore, datasource, bind } from 'alt-utils/lib/decorators'
import { NoticeActions } from 'actions'

@createStore(alt)
export default class NoticeStore {
  constructor() {
    this.state = {
      notices: [],
      flags: [],
      confirmNavigation: false
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

  setConfirmNavigation(data) {
    // allow flags to be set if if they are already
    if (this.flags.indexOf(data.key) < 0) {
      this.flags[data.key] = data.message;
    }
    this.confirmNavigation = true;
  }

  unsetConfirmNavigation(key) {
    delete this.flags[key];
    // we're using non-numeric keys so this.flags.length doesn't work
    if (_.keys(this.flags).length < 1) {
      this.confirmNavigation = false;
    }
  }

  unsetAllConfirmNavigation() {
    this.flags = [];
    this.confirmNavigation = false;
  }
}
