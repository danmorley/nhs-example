import React, { Component } from "react"
import PropTypes from "prop-types"

class Question extends Component {
  render() {
    const { inputType, text } = this.props
    const optionList = this.props.options.map((option, index) => {
      return (
        <ul key={ index }>
          <Option { ...option } inputType={ inputType } name={ text }></Option>
        </ul>
      )
    })

    return (
      <div>
        { this.props.text }
        <div>
          { optionList }
        </div>
      </div>
    )
  }
}

Question.propTypes = {
  text: PropTypes.string,
  options: PropTypes.array,
  inputType: PropTypes.string
}

export default Question


class Option extends Component {
  render() {
    return (
      <li>
        <label>
          <input
            type={ this.props.inputType }
            name={ this.props.name }
            value={ this.props.text }
          />
          { this.props.text }
        </label>
      </li>
    )
  }
}

Option.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  inputType: PropTypes.string
}
