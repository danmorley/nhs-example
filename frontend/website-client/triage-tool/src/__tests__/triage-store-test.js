/* eslint-disable no-undef, no-console */

import TriageStore from "../triage-store"

const createStore = questions => {
  return TriageStore.create({
    currentPanel: 0,
    questions: questions
  })
}

const buildQuestionsWithSelectedOptions = dependencyValues => {
  return dependencyValues.map((dependencyValue, index) => {
    return {
      id: `q${index + 1}`,
      text: `question ${index}`,
      inputType: "radio",
      options: [
        {
          id: `o${index}`,
          text: "An option",
          dependence: dependencyValue
        }
      ]
    }
  })
}

const buildThreeOptionQuestion = type => {
  return {
    id: "q1",
    text: "which letter?",
    inputType: type,
    options: [
      {
        id: "a",
        text: "An option",
        dependence: 0
      },
      {
        id: "b",
        text: "An option",
        dependence: 0
      },
      {
        id: "c",
        text: "An option",
        dependence: 0
      }
    ]
  }
}


describe("radio button based options", () => {
  test("selecting one option deselects others", () => {
    const radioQuestion = buildThreeOptionQuestion("radio")
    const store = createStore([radioQuestion])
    const question = store.questions.find(q => q.id.toString() == "q1")

    question.options.find(o => o.id.toString() == "a").toggleSelect()
    expect(question.selectedOptions[0].id).toEqual("a")

    question.options.find(o => o.id.toString() == "c").toggleSelect()
    expect(question.selectedOptions[0].id).toEqual("c")
  })
})

describe("checkbox based options", () => {
  test("selecting one option does not deselect others", () => {
    const checkboxQuestion = buildThreeOptionQuestion("checkbox")
    const store = createStore([checkboxQuestion])
    const question = store.questions.find(q => q.id.toString() == "q1")

    question.options.find(o => o.id.toString() == "a").toggleSelect()
    expect(question.selectedOptions.map(o => o.id)).toEqual(["a"])

    question.options.find(o => o.id.toString() == "c").toggleSelect()
    expect(question.selectedOptions.map(o => o.id)).toEqual(["a", "c"])

    question.options.find(o => o.id.toString() == "a").toggleSelect()
    expect(question.selectedOptions.map(o => o.id)).toEqual(["c"])
  })
})

describe("question locking", () => {
  test("question is locked if no option selected for previous question", () => {
    const store = createStore(buildQuestionsWithSelectedOptions([0, 0, 0]))
    const question1 = store.questions.find(q => q.id.toString() == "q1")
    const question2 = store.questions.find(q => q.id.toString() == "q2")
    const question3 = store.questions.find(q => q.id.toString() == "q3")

    question1.options[0].toggleSelect()

    expect(question1.locked).toEqual(false)
    expect(question2.locked).toEqual(false)
    expect(question3.locked).toEqual(true)
  })
})

describe("all questions answered", () => {
  test("returns false if any questions have no selected options", () => {
    const store = createStore(buildQuestionsWithSelectedOptions([0, 0, 0]))
    const question1 = store.questions.find(q => q.id.toString() == "q1")

    question1.options[0].toggleSelect()

    expect(store.allQuestionsAnswered).toEqual(false)
  })

  test("returns true if all questions have selected options", () => {
    const store = createStore(buildQuestionsWithSelectedOptions([0, 0, 0]))
    const question1 = store.questions.find(q => q.id.toString() == "q1")
    const question2 = store.questions.find(q => q.id.toString() == "q2")
    const question3 = store.questions.find(q => q.id.toString() == "q3")

    question1.options[0].toggleSelect()
    question2.options[0].toggleSelect()
    question3.options[0].toggleSelect()

    expect(store.allQuestionsAnswered).toEqual(true)
  })
})

describe("calculates dependence based on total from selected options", () => {
  test("returns 0 for all 0 options", () => {
    const store = createStore(buildQuestionsWithSelectedOptions([0, 0, 0]))
    store.questions.forEach(q => {
      q.options.forEach(o => {
        o.toggleSelect()
      })
    })

    expect(store.dependence).toEqual(0)
  })

  test("returns 0 for options of 1, 0, and 3 when none selected", () => {
    const store = createStore(buildQuestionsWithSelectedOptions([1, 0, 3]))

    expect(store.dependence).toEqual(0)
  })

  test("returns 4 for options of 1, 0 and 3 when all selected", () => {
    const store = createStore(buildQuestionsWithSelectedOptions([1, 0, 3]))
    store.questions.forEach(q => {
      q.options.forEach(o => {
        o.toggleSelect()
      })
    })

    expect(store.dependence).toEqual(4)
  })
})
