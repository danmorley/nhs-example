import React, { Component } from "react"
import PropTypes from "prop-types"
import { MdExpandMore, MdExpandLess } from "react-icons/lib/md"
import { observer } from "mobx-react"

import { TriageToolContainer, AppHeader, AppIntro, AccordionPanelContainer, Button, OpenIndicator } from "./styles"
import Question from "./Question"

class TriageTool extends Component {
  render() {
    const { questions, currentPanel, changePanel, dependence, previousAttempts } = this.props.store
    const questionColors = ["#028586","#197271","#145b5b"]
    const questionList = questions.map((question, index) => {
      return (
        <AccordionPanel toggleOpen={ () => changePanel(index + 1) }
          open={ currentPanel == (index + 1) }
          key={ index }
          backgroundColor={questionColors[index]}
          heading={ `Question ${ index + 1 } out of ${ questions.length }` }>

          <Question { ...question } store={ question } />

        </AccordionPanel>
      )
    })

    return (
      <TriageToolContainer>
        <AccordionPanel toggleOpen={ () => changePanel(0) }
          appHeading={ true }
          open={ currentPanel == 0 } heading="Quit smoking now! Create your free plan">
          <AppIntro>
            { "There's loads of support to help you quit." }
            Find out what combination is right you and create your personalised quit plan in 3 easy steps.
          </AppIntro>
          <p><Button onClick={ () => changePanel(1) }>Start</Button></p>
        </AccordionPanel>

        { questionList }

        <AccordionPanel toggleOpen={ () => changePanel(questions.length + 1) }
          open={ currentPanel == (questions.length + 1) }
          heading="Feedback">
          <p>Dependence: { dependence }</p>
          <p>{ previousAttempts }</p>
        </AccordionPanel>

      </TriageToolContainer>
    )
  }
}

TriageTool.propTypes = {
  store: PropTypes.object
}

export default observer(TriageTool)



class AccordionPanel extends Component {
  render() {
    const bigHeader = (
      <AppHeader>{ this.props.heading }</AppHeader>
    )
    const smallHeader = (
      <div>
        { this.props.heading }
        <OpenIndicator>{ this.props.open ? <MdExpandLess size="40" /> : <MdExpandMore size="40" />}</OpenIndicator>
      </div>
    )
    return (
      <AccordionPanelContainer backgroundColor={this.props.backgroundColor} open={this.props.open}>
        <header onClick={ this.props.toggleOpen }>{ this.props.appHeading ? bigHeader : smallHeader }</header>
        { this.props.open ? this.props.children : "" }
      </AccordionPanelContainer>
    )
  }
}

AccordionPanel.propTypes = {
  toggleOpen: PropTypes.func,
  open: PropTypes.bool,
  appHeading: PropTypes.bool,
  heading: PropTypes.string,
  backgroundColor: PropTypes.string
}