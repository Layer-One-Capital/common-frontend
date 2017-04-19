import { ComposedField } from './ComposedField'
import { TextField } from 'material-ui'

class BlimpTextField extends React.Component {
  static contextTypes = {
    onEnterKeyDown: React.PropTypes.func
  }

  focus() { this.refs.textField.focus() }

  handleKeyDown(e) {
    if (e.keyCode === 13)
      this.props.onEnterKeyDown() || this.context.onEnterKeyDown
  }

  render() {
    return (
      <TextField value={this.props.value}
        ref="textField"
        style={{width: "90%"}}
        floatingLabelText={ `${ this.props.floatingLabelText }`}
        errorText={this.props.errorText}
        type={this.props.type}
        onChange={::this.props.handleChange}
        autoCorrect={this.props.autoCorrect }
        autoCapitalize={this.props.autoCapitalize}
        autoComplete={this.props.autoComplete}
        spellCheck={this.props.spellCheck}
        onKeyDown={::this.handleKeyDown}
      />
    )
  }
}

export default ComposedField(BlimpTextField); // Enhanced component
