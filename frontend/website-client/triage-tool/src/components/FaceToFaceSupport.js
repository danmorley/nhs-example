import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"

class FaceToFaceSupport extends Component {
  render() {
    const { dependenceGroup } = this.props.store

    let faceToFaceSupport = <div></div>
    switch (dependenceGroup) {
    case "low":
      faceToFaceSupport = (
        <div>
          <h2>Talk to a medical expert</h2>
          <div>
            <p>
              { "There's a range of support available, from your local stop smoking service to your pharmacy and GP, who will all able to give you advice and tips, including advice on what the right prescription medicines are right for you." }
            </p>
            <p>
              Enter your postcode to find your local stop smoking service and pharmacy.
            </p>
          </div>
        </div>
      )
      break
    case "medium":
      faceToFaceSupport = (
        <div>
          <h2>Chat to your pharmacist</h2>
          <div>
            <p>
              Your local pharmacist can give you loads of advice and tips to help you quit for good. Find your nearest pharmacy.
            </p>
            <p>
              Your local stop smoking service or GP can also give you loads of tips and support to help you quit for good, including what prescription medicines might be right for you.
            </p>
          </div>
        </div>
      )
      break
    case "high":
      faceToFaceSupport = (
        <div>
          <h2>Local stop smoking service and pharmacist</h2>
          <div>
            <p>
              Your local stop smoking service and pharmacist will give you encouragement and expert advice on how to stop smoking, including what prescription medicines might be right for you. Find services near you now.
            </p>
            <p>
              Your local GP can also give you loads of tips and support to help you quit for good.
            </p>
          </div>
        </div>
      )
      break
    }

    return faceToFaceSupport
  }
}

FaceToFaceSupport.propTypes = {
  store: PropTypes.object
}

export default observer(FaceToFaceSupport)
