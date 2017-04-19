import alt from 'flux'

class NoticeActions {
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
    this.actions.setNotice({ message: 'An error occurred. If the error persists email hello@blimpon.com' })
  }

  confirmNavigation(key, message) {
    this.actions.setConfirmNavigation({ key: key, message: message });
  }

  clearConfirmNavigation(key) {
    this.actions.unsetConfirmNavigation(key);
  }

  clearAllConfirmNavigation() {
    this.actions.unsetAllConfirmNavigation();
  }
}

module.exports = alt.createActions(NoticeActions);
