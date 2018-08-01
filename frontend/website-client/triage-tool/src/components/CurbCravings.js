import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"

class CurbCravings extends Component {
  render() {
    const { usedEcigsOrVape } = this.props.store

    let eCigs = <div></div>
    if (usedEcigsOrVape) {
      eCigs = (
        <div>
          <h2>E-cigarettes / Vape</h2>
          <div>
            <p>
              { "These are fast-acting and can really help you manage your nicotine cravings and they are at least 95% less harmful than cigarettes. As you've used these before, it might be worth adjusting your nicotine levels or trying a different model. Find out more about vapes/e-cigarettes [LINK TO NEW ARTICLE]. Your local specialist vape shop can find the right one for you. [Link to IBVA finder]." }
            </p>
          </div>
        </div>
      )
    } else {
      eCigs = (
        <div>
          <h2>E-cigarettes / Vape</h2>
          <div>
            <p>
              { "These are fast-acting and can really help you manage your nicotine cravings and they are at least 95% less harmful than cigarettes. Find out more about vapes/e-cigarettes [LINK TO NEW ARTICLE]. Your local specialist vape shop can find the right one for you. [Link to IBVA finder]." }
            </p>
          </div>
        </div>
      )
    }

    return eCigs
  }
}

CurbCravings.propTypes = {
  store: PropTypes.object
}

export default observer(CurbCravings)
