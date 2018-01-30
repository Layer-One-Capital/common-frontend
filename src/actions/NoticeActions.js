import alt from 'flux'
import { createActions } from 'alt-utils/lib/decorators'

@createActions(alt)
export default class NoticeActions {
  constructor() {
    this.generateActions(
      'setNotice',
      'clearNotices'
    );
  }

  setGenericError() {
    const actions = this.actions || this // NOTE: this is because we mix alt versions between Blimpon and v3, so the 'actions' reference is different in each
    
    actions.setNotice({ 
      message: `Error: An error has occurred. Please refresh the page to try again. If the error persists email ${config.supportEmail || "help@pluginseo.com"}`, 
      actionText: 'Refresh',
      onAction: () => {location.reload();}
    })
  }
}
