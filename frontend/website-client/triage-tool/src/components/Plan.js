import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"

import { planSteps } from "../config"
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
      </PlanContainer>
    )

  }
}

Plan.propTypes = {
  store: PropTypes.object
}

export default observer(Plan)
