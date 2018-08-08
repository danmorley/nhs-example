import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"

class PlanStep extends Component {
  render() {
    const { step, store } = this.props
    const filteredRecommendations = store.filterRecommendations(step.recommendations)
    const recommendations = filteredRecommendations.map((r, i) => {
      return <div key={ i }>
        <h3>{ r.title }</h3>
        <div dangerouslySetInnerHTML={{__html: r.body }}></div>
      </div>
    })

    return (
      <div>
        <h2>{ step.title }</h2>
        <p>{ step.intro }</p>
        <div>
          { recommendations }
        </div>
      </div>
    )
  }
}

PlanStep.propTypes = {
  store: PropTypes.object,
  step: PropTypes.object
}

export default observer(PlanStep)
