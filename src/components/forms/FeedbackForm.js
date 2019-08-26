import React from 'react'
import { Button } from 'components'

const DISMISSED_VAL = 'dismissed'

export default class FeedbackForm extends React.Component {
  static propTypes = {
    question: React.PropTypes.string.isRequired,
    helpLink: React.PropTypes.string,
    buttonTextYes: React.PropTypes.string,
    buttonTextNo: React.PropTypes.string,
    repeating: React.PropTypes.bool,
    storeKey: React.PropTypes.string,
    onMount: React.PropTypes.func,
    onAnswer: React.PropTypes.func,
    className: React.PropTypes.string
  }

  static defaultProps = {
    buttonTextYes: 'Yes',
    buttonTextNo: 'No, I need help',
    repeating: false,
    className: ''
  }

  constructor(props) {
    super(props)

    this.preserveDimissStatus = !props.repeating && !!props.storeKey
    this.state = { dismissed: this.preserveDimissStatus && localStorage.getItem(props.storeKey) === DISMISSED_VAL }
  }

  componentWillMount() {
    this.props.onMount && this.props.onMount()
  }

  handleClick(answer) {
    const { storeKey, onAnswer } = this.props

    this.setState({ dismissed: true })
    if (this.preserveDimissStatus) localStorage.setItem(storeKey, DISMISSED_VAL)

    onAnswer && onAnswer(answer)
  }

  render() {
    const { question, helpLink, buttonTextYes, buttonTextNo, className } = this.props

    if (this.state.dismissed) return null
    return (
      <div className={`customer-feedback__form ${className}`}>
        <h3>{question}</h3>

        <Button
          label={buttonTextYes}
          buttonType="primary"
          className="customer-feedback__form__btn--yes"
          onTouchTap={() => this.handleClick('yes')}
        />
        {helpLink ? (
          <a target="_blank" href={helpLink} onClick={() => this.handleClick('no')}>
            <Button
              label={buttonTextNo}
              buttonType="secondary"
              className="customer-feedback__form__btn--no"
            />
          </a>
        ) : (
          <Button
            label={buttonTextNo}
            buttonType="secondary"
            className="customer-feedback__form__btn--no"
            onClick={() => this.handleClick('no')}
          />
        )}        
      </div>
    )
  }
}
