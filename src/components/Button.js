import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Button extends React.Component {
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.backgroundColor = this.backgroundColor.bind(this)
    this.labelColor = this.labelColor.bind(this)
    this.borderColor = this.borderColor.bind(this)
  }

  backgroundColor() {
    const { buttonType } = this.props
    switch (buttonType) {
      case 'primary':
        return this.context.muiTheme.palette.primary1Color;
      case 'secondary':
        return 'transparent'
      case 'secondaryLight':
        return 'transparent'
    }
  }

  labelColor() {
    const { buttonType } = this.props
    switch (buttonType) {
      case 'primary':
        return this.context.muiTheme.palette.white;
      case 'secondary':
        return this.context.muiTheme.palette.primary1Color;
      case 'secondaryLight':
        return this.context.muiTheme.palette.white;
    }
  }

  borderColor() {
    if (this.props.disabled) { return 'transparent'; }

    const { buttonType } = this.props
    switch (buttonType) {
      case 'primary':
        return this.context.muiTheme.palette.primary1Color;
      case 'secondary':
        return this.context.muiTheme.palette.primary1Color;
      case 'secondaryLight':
        return this.context.muiTheme.palette.white;
    }
  }

  render() {
    return(
      <RaisedButton
        label={this.props.label}
        href={this.props.href}
        disabled={this.props.disabled}
        type={this.props.type}
        onTouchTap={this.props.onTouchTap}
        className={this.props.className}
        backgroundColor={this.backgroundColor()}
        buttonStyle={{borderRadius: 6, border: `solid 1px ${this.borderColor()}`}}
        labelColor={this.labelColor()}
        labelStyle={{fontFamily: 'Montserrat', letterSpacing: 0.3}}
        style={{borderRadius: 6, backgroundColor: 'transparent', minWidth: 0}}
      />
    )
  }
}
