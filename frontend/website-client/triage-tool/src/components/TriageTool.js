import React, { Component } from "react"
import PropTypes from "prop-types"
import { TriageToolContainer, AccordionPanelContainer, Button } from "./styles"

import Question from "./Question"

class TriageTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPanel: 0,
      answers: []
    }
  }

  render() {
    const { questions } = this.props.config
    const questionList = questions.map((question, index) => {
      return (
        <AccordionPanel toggleOpen={ () => this.setState({currentPanel: (index + 1)}) }
          open={ this.state.currentPanel == (index + 1) }
          key={ index }
          heading={ `Question ${ index + 1 } out of ${ questions.length }` }>

          <Question questionText={ question.text }/>

        </AccordionPanel>
      )
    })

    return (
      <TriageToolContainer>

        <AccordionPanel toggleOpen={ () => this.setState({currentPanel: 0}) }
          open={ this.state.currentPanel == 0 }
          heading="Triage Tool">
          <div>
            This is the header
          </div>
          <div>
            <Button onClick={ () => this.setState({currentPanel: 1}) }>Start</Button>
          </div>
        </AccordionPanel>

        { questionList }

        <AccordionPanel toggleOpen={ () => this.setState({currentPanel: (questions.length + 1)}) }
          open={ this.state.currentPanel == (questions.length + 1) }
          heading="Feedback">
          This is the feedback section
        </AccordionPanel>

      </TriageToolContainer>
    )
  }
}

TriageTool.propTypes = {
  config: PropTypes.object
}

export default TriageTool



class AccordionPanel extends Component {
  render() {
    return (
      <AccordionPanelContainer>
        <header onClick={ this.props.toggleOpen }>{ this.props.heading }</header>
        { this.props.open ? this.props.children : "" }
      </AccordionPanelContainer>
    )
  }
}

AccordionPanel.propTypes = {
  toggleOpen: PropTypes.func,
  open: PropTypes.bool,
  heading: PropTypes.string
}
