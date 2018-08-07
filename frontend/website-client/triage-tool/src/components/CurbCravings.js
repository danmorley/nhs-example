import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"

class CurbCravings extends Component {
  render() {
    const { usedEcigsOrVape, dependenceGroup, usedNRT } = this.props.store

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

    let nrt = <div></div>
    switch (dependenceGroup) {
    case "high":
      if (usedNRT) {
        nrt = (
          <div>
            <h2>Patches + Inhaler or Spray</h2>
            <div>
              <p>
                { "You may have tried Nicotine Replacement Therapies [LINK TO NEW ARTICLE] before, they help you manage your nicotine cravings, but they are most effective when you combine them. It's important to use 2 different types of products as it will make it easier. Patches will deliver nicotine to your body throughout the day and an inhaler or spray will provide immediate relief from cravings." }
              </p>
            </div>
          </div>
        )
      } else {
        nrt = (
          <div>
            <h2>Patches + Inhaler or Spray</h2>
            <div>
              <p>
                { "Nicotine Replacement Therapies [LINK TO NEW ARTICLE] will help you manage your nicotine cravings. They are most effective when you combine 2 different types of support. Patches will deliver nicotine to your body throughout the day and an inhaler or spray will provide immediate relief from cravings." }
              </p>
            </div>
          </div>
        )
      }
      break
    case "medium":
      if (usedNRT) {
        nrt = (
          <div>
            <h2>Patches + Lozenge or Strips</h2>
            <div>
              <p>
                { "You may have tried Nicotine Replacement Therapies [LINK TO NEW ARTICLE] before, they help you manage your nicotine cravings, but they are most effective when you combine them. It's important to use 2 different types of support as it will make it easier. Patches will deliver nicotine to your body throughout the day and lozenges or strips will provide immediate relief from cravings." }
              </p>
            </div>
          </div>
        )
      } else {
        nrt = (
          <div>
            <h2>Patches + Lozenge or Strips</h2>
            <div>
              <p>
                { "Nicotine Replacement Therapies [LINK TO NEW ARTICLE] will help you manage your nicotine cravings. They are most effective when you combine 2 different types of support. Patches will deliver nicotine to your body throughout the day and an lozenges or strips will provide immediate relief from cravings." }
              </p>
            </div>
          </div>
        )
      }
      break
    case "low":
      if (usedNRT) {
        nrt = (
          <div>
            <h2>Patches + gum</h2>
            <div>
              <p>
                { "You may have tried Nicotine Replacement Therapies [LINK TO NEW ARTICLE] before, they help you manage your nicotine cravings, but they are most effective when you combine 2 different types of support.  Patches will deliver nicotine to your body throughout the day and gum will provide immediate relief from cravings." }
              </p>
            </div>
          </div>
        )
      } else {
        nrt = (
          <div>
            <h2>Patches + gum</h2>
            <div>
              <p>
                { "Nicotine Replacement Therapies [LINK TO NEW ARTICLE] can help you quit. They help you manage your nicotine cravings, but they are most effective when you combine 2 different types of support. Patches will deliver nicotine to your body throughout the day and gum will provide immediate relief from cravings." }
              </p>
            </div>
          </div>
        )
      }
      break
    }

    return (
      <div>
        { eCigs }
        { nrt }
      </div>
    )
  }
}

CurbCravings.propTypes = {
  store: PropTypes.object
}

export default observer(CurbCravings)
