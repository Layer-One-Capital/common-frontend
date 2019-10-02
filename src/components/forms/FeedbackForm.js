import React from 'react'
import { Button } from 'components'
import Analytics from 'utils'

const DISMISSED_VAL = 'dismissed'
const POSITIVE_FEEDBACK_VAL = false;

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
    className: '',
  }

  constructor(props) {
    super(props)

    this.preserveDimissStatus = !props.repeating && !!props.storeKey
    this.state = {
      dismissed: this.preserveDimissStatus && localStorage.getItem(props.storeKey) === DISMISSED_VAL,
      positiveFeedbackGiven: false
    }
  }

  componentWillMount() {
    this.props.onMount && this.props.onMount()
  }

  handleClick(answer) {
    const { storeKey, onAnswer } = this.props

    if(answer == 'yes') {
      this.setState({ positiveFeedbackGiven: true })
    }

    this.setState({ dismissed: true })
    if (this.preserveDimissStatus) localStorage.setItem(storeKey, DISMISSED_VAL)

    onAnswer && onAnswer(answer)
  }

  closeFeedback(feedbackGiven) {
    if(feedbackGiven) {
      Analytics.track('Feedback Review Offered', {
        willing_to_review: 'yes'
      })
    } else {
      Analytics.track('Feedback Review Offered', {
        willing_to_review: 'no'
      })
    }

    this.setState({
      positiveFeedbackGiven: false,
      dismissed: true
    })
  }

  renderForm() {
    if(this.state.positiveFeedbackGiven) {
      <div className={`customer-feedback__form ${className}`}>
        <h3>That's great to hear. If you have a minute, would you be able to write us a short review?</h3>

        <Button
          label="Sure, I have a minute"
          buttonType="primary"
          className="customer-feedback__form__btn--yes"
          onTouchTap={() => this.closeFeedback('yes')}
        />

        <Button
          label={buttonTextNo}
          buttonType="secondary"
          className="customer-feedback__form__btn--no"
          onClick={() => this.closeFeedback('no')}
        />

      </div>
    } else {
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
    }
  }


  render() {
    const { question, helpLink, buttonTextYes, buttonTextNo, className } = this.props

    if (this.state.dismissed && !this.positiveFeedbackGiven) return null
    return (
      {this.renderForm}
    )
  }
}
