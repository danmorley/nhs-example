import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"

import { CheckboxList, RadiobuttonList } from "./styles"


class Question extends Component {
  render() {
    const { inputType, text, options } = this.props.store
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

    let optionListContainer = (
      <RadiobuttonList>
        { optionList }
      </RadiobuttonList>
    )

    if (inputType == "checkbox") {
      optionListContainer = (
        <CheckboxList>
          { optionList }
        </CheckboxList>
      )
    }

    return (
      <div>
        <h2>{ text }</h2>
        <p>{inputType == "radio" ? "Pick one" : "Pick as many as you like"}</p>
        { optionListContainer }
      </div>
    )
  }
}

Question.propTypes = {
  store: PropTypes.object
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
          <span className="checkmark"></span>
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
