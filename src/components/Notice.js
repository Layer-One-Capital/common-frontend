import connectToStores from 'alt-utils/lib/connectToStores'
import React from 'react'
import { Snackbar } from 'material-ui'
import { NoticeStore } from 'stores'
import { NoticeActions } from 'actions'

@connectToStores
export default class Notice extends React.Component {
  constructor(props) {
    super(props)
  }
  
  static getStores() {
    return [NoticeStore]
  }

  static getPropsFromStores() {
    return NoticeStore.getState()
  }

  render() {
    let notices = this.props.notices;
    
    let renderedNotices = notices.map((notice) => { 
      return (<Snackbar
        ref='snackbar'
        open={ notice ? true : false }
        message={ (notice && notice.message) || 'An error occured' }
        action={ notice && notice.actionText ? notice.actionText : 'dismiss' }
        style={ { maxWidth: 968 } }
        bodyStyle={{ height: 'auto', lineHeight: '28px', padding: 24, whiteSpace: 'pre-line' }}
        onActionTouchTap={ notice && notice.onAction ? notice.onAction : () => { NoticeActions.clearNotices(); } }
        onRequestClose={ () => {} } 
      />)
    })
    
    return(<div>{renderedNotices}</div>)
  }
}
