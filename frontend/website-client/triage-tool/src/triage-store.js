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
        getParent(getParent(self)).nextPanel()
      } else {
        self.selectedOptions = xor(self.selectedOptions, [option])
      }
    }
  }))
  .views(self => ({
    isSelected(option) {
      return self.selectedOptions.map(o => o.id).includes(option)
    },
    get locked() {
      if (self.id == "q1") {
        return false
      } else {
        const currentQuestionIndex = getParent(self).findIndex(q => q.id == self.id)
        return getParent(self)[currentQuestionIndex - 1].selectedOptions.length == 0
      }
    },
    get dependence() {
      return self.selectedOptions
        .reduce((acc, option) => acc + option.dependence, 0)
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
    },
    nextPanel() {
      self.currentPanel += 1
    }
  }))
  .views(self => ({
    get dependence() {
      return self.questions
        .reduce((acc, question) => acc + question.dependence, 0)
    },
    get previousAttempts() {
      return self.questions
        .find(q => q.id == "q3").selectedOptions
        .map(option => option.text)
    },
    get allQuestionsAnswered() {
      return self.questions
        .every(q => q.selectedOptions.length > 0)
    },
    get dependenceGroup() {
      if (self.dependence < 3) {
        return "low"
      } else if (self.dependence > 4) {
        return "high"
      } else {
        return "medium"
      }
    },
    get usedWillpowerAlone() {
      return self.questions
        .find(q => q.id == "q3").selectedOptions
        .some(o => o.id == "13")
    },
    get usedEcigsOrVape() {
      return self.questions
        .find(q => q.id == "q3").selectedOptions
        .some(o => o.id == "9")
    },
    get usedNRT() {
      return self.questions
        .find(q => q.id == "q3").selectedOptions
        .some(o => o.id == "10")
    }
  }))

export default TriageStore
