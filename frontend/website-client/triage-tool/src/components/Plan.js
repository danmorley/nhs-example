import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"

import { planTemplates } from "../config"
import FaceToFaceSupport from "./FaceToFaceSupport"
import { PlanContainer } from "./styles"

class Plan extends Component {
  render() {
    const store = this.props.store

    return (
      <PlanContainer>
        <div>
          <h2>{ "Great you're quitting!"}</h2>
          <p>{ planTemplates.planIntro(store) }</p>
          <hr />
        </div>
        <div>
          <h2>Get face-to-face support</h2>
          <FaceToFaceSupport store={ store }></FaceToFaceSupport>
        </div>
      </PlanContainer>
    )

  }
}

Plan.propTypes = {
  store: PropTypes.object
}

export default observer(Plan)
