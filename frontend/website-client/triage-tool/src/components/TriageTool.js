import React, { Component } from "react"
import PropTypes from "prop-types"

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
      <div>
        This is the tool
      </div>
    )
  }
}

TriageTool.propTypes = {
  config: PropTypes.object
};

export default TriageTool
