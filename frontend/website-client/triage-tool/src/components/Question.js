import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"

class Question extends Component {
  render() {
    const { inputType, text, options } = this.props
    const optionList = options.map((option, index) => {
      return (
        <Option { ...option }
          store={ option }
          key={ index }
          selected={ option.selected }
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

export default observer(Question)


class Option extends Component {
  render() {
    const { inputType, name, text, selected, store } = this.props
    return (
      <li>
        <label>
          <input
            type={ inputType }
            name={ name }
            value={ text }
            onClick={ store.toggleSelect }
            checked={ selected }
            readOnly={ true }
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
  inputType: PropTypes.string,
  selected: PropTypes.bool,
  store: PropTypes.object
}
