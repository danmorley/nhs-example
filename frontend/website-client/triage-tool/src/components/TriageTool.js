import React, { Component } from "react"
import PropTypes from "prop-types"
import { TriageToolContainer } from "./styles"

class TriageTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPanel: 0,
      answers: []
    }
  }

  render() {
    return (
      <TriageToolContainer>
        This is the tool
      </TriageToolContainer>
    )
  }
}

TriageTool.propTypes = {
  config: PropTypes.object
}

export default TriageTool
