import { types } from "mobx-state-tree"

const TriageStore = types
  .model("TriageStore", {
    currentPanel: types.number
  })
  .actions(self => ({
    changePanel(panel) {
      self.currentPanel = panel
    }
  }))

//const Question = types
//  .model("Question", {
//    type: types.enumeration("questionType", ["radio", "checkbox"])
//  })

export default TriageStore
