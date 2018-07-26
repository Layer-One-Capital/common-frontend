import React from 'react'
import { Dialog } from 'material-ui'

export default class ResponsiveDialog extends React.Component {
  static propTypes = {
    modal: React.PropTypes.bool,
    maxWidth: React.PropTypes.string
  }
  static defaultProps = {
    modal: true,
    maxWidth: '450px'
  }

  constructor(props) {
    super(props)
  }

  render() {
    // https://discuss.reactjs.org/t/best-practices-for-extending-subclassing-components/1820
    return (
      <Dialog {...this.props}
        modal={this.props.modal}
        repositionOnUpdate={false}
        autoDetectWindowHeight={false}
        autoScrollBodyContent={false}
        titleStyle={{
          fontSize: 24,
          padding: '36px 40px 0 40px'
        }}
        contentStyle={{
          width: '100%',
          maxWidth: this.props.maxWidth,
          maxHeight: '100% !important',
          marginTop: -65
        }}
        bodyStyle={{
          color: '#212121',
          maxHeight: '100% !important',
          padding: '0 40px 36px'
        }}
        style={{
          paddingTop: 0,
          bottom: 0,
          overflowY: 'scroll',
          height: 'auto !important'
        }}
      />
    )
  }
}
