import React, { Component } from "react"
import PropTypes from "prop-types"

class Question extends Component {
  render() {
    const { inputType, text, options } = this.props
    const optionList = options.map((option, index) => {
      return (
        <Option { ...option }
          key={ index }
          inputType={ inputType }
          name={ text }>
        </Option>
      )
    })

    return (
      <div>
        <h2>{ text }</h2>
        <ul>
          { optionList }
        </ul>
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
    const { inputType, name, text } = this.props
    return (
      <li>
        <label>
          <input
            type={ inputType }
            name={ name }
            value={ text }
          />
          { text }
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
