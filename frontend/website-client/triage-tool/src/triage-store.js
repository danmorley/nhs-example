import { types, getParent } from "mobx-state-tree"
import xor from "lodash/xor"

const Option = types
  .model("Option", {
    id: types.identifier(types.string),
    text: types.string,
    dependence: types.optional(types.number, 0)
  })
  .actions(self => ({
    toggleSelect() {
      getParent(getParent(self)).selectOption(self)
    }
  }))
  .views(self => ({
    get selected() {
      return getParent(getParent(self)).isSelected(self.id.toString())
    }
  }))

const Question = types
  .model("Question", {
    id: types.identifier(types.string),
    text: types.string,
    inputType: types.enumeration("inputType", ["radio", "checkbox"]),
    options: types.array(Option),
    selectedOptions: types.optional(types.array(types.reference(Option)), [])
  })
  .actions(self => ({
    selectOption(option) {
      if (self.inputType == "radio") {
        self.selectedOptions = [option]
      } else {
        self.selectedOptions = xor(self.selectedOptions, [option])
      }
    }
  }))
  .views(self => ({
    isSelected(option) {
      return self.selectedOptions.map(o => o.id).includes(option)
    }
  }))

const TriageStore = types
  .model("TriageStore", {
    currentPanel: types.number,
    questions: types.array(Question)
  })
  .actions(self => ({
    changePanel(panel) {
      self.currentPanel = panel
    }
  }))
  .views(self => ({
    get dependence() {
      return self.questions
        .reduce((acc, question) => acc.concat(question.selectedOptions), [])
        .reduce((acc, option) => acc + option.dependence, 0)
    },
    get previousAttempts() {
      return self.questions
        .find(q => q.id == "q3").selectedOptions
        .map(option => option.text)
    }
  }))

export default TriageStore
