export var ComposedField = ComposedComponent => class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { errorText: this.props.serverErrorText }
  }

  isValid() {
    return this._validate(this.state.value)
  }

  focus() {
    this.refs.composedComponent.focus()
  }

  onChange(e) {
    e.preventDefault()
    this.setState({value: e.target.value})
    this._validate(e.target.value)
    this.props.onChange(e.target.value, this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.serverErrorText)
      this.setState({ errorText: nextProps.serverErrorText })
  }

  _validate(value) {
    if ((this.props.required) && (( value === '') || !value)) {
      this.setState({ errorText: 'This field is required'})
      return false
    } else {
      this.setState({errorText: null })
      return true
    }
  }

  render() {
    return <ComposedComponent
      {...this.props}
      ref='composedComponent'
      value={this.state.value || this.props.defaultValue}
      errorText={this.state.errorText}
      handleChange={this.onChange.bind(this)}
      />
  }
}
