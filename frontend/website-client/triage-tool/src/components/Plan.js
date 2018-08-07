import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"

import { planTemplates, planSteps } from "../config"
import FaceToFaceSupport from "./FaceToFaceSupport"
import CurbCravings from "./CurbCravings"
import PlanStep from "./PlanStep"
import { PlanContainer } from "./styles"

class Plan extends Component {
  render() {
    const store = this.props.store
    const steps = planSteps.map((step, i) => {
      return <PlanStep key={ i } step={ step } store={ store }></PlanStep>
    })

    return (
      <PlanContainer>
        { steps }
        <hr />
        <hr />
        <hr />
        <hr />
        <div>
          <h2>{ "Great you're quitting!"}</h2>
          <p>{ planTemplates.planIntro(store) }</p>
          <hr />
        </div>
        <div>
          <h2>Get face-to-face support</h2>
          <FaceToFaceSupport store={ store }></FaceToFaceSupport>
        </div>
        <div>
          <h2>Curb your cravings with a combination</h2>
          <CurbCravings store={ store }></CurbCravings>
        </div>
      </PlanContainer>
    )

  }
}

Plan.propTypes = {
  store: PropTypes.object
}

export default observer(Plan)
