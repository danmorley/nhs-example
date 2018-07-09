import React, { Component } from "react"
import PropTypes from "prop-types"

class Question extends Component {
  render() {
    return (
      <div>
        { this.props.questionText }
      </div>
    )
  }
}

Question.propTypes = {
  questionText: PropTypes.string,
}

export default Question
