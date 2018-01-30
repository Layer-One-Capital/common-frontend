import alt from 'flux'
import { createActions } from 'alt-utils/lib/decorators'

@createActions(alt)
export default class NoticeActions {
  constructor() {
    this.generateActions(
      'setNotice',
      'clearNotices',
      'setConfirmNavigation',
      'unsetConfirmNavigation',
      'unsetAllConfirmNavigation'
    );
  }

  setGenericError() {
    this.setNotice({ 
      message: `Error: An error has occurred. Please refresh the page to try again. If the error persists email ${config.supportEmail || "help@pluginseo.com"}`, 
      actionText: 'Refresh',
      onAction: () => {location.reload();}
    })
  }

  confirmNavigation(key, message) {
    this.setConfirmNavigation({ key: key, message: message });
  }

  clearConfirmNavigation(key) {
    this.unsetConfirmNavigation(key);
  }

  clearAllConfirmNavigation() {
    this.unsetAllConfirmNavigation();
  }
}
