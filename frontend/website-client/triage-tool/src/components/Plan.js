/* eslint-disable no-console */

import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"

import { planSteps } from "../config"
import PlanStep from "./PlanStep"
import { PlanContainer } from "./styles"

class Plan extends Component {
  render() {
    const store = this.props.store
    const [ firstStep, ...remainingSteps ] = planSteps
    const introStep = <PlanStep step={ firstStep } store={ store }></PlanStep>
    const mainSteps = remainingSteps.map((step, i) => {
      return <PlanStep key={ i } step={ step } store={ store }></PlanStep>
    })

    // TODO: log added for paragon devs, remove when integrated
    console.dir(store.planForExport)

    return (
      <PlanContainer>
        <div>{ introStep }</div>
        <div>{ mainSteps }</div>
      </PlanContainer>
    )

  }
}

Plan.propTypes = {
  store: PropTypes.object
}

export default observer(Plan)
