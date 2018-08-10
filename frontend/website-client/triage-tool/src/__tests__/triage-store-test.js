/* eslint-disable no-undef, no-console */

import TriageStore from "../triage-store"
import { questions } from "../config"

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

describe("calculates dependence group based on dependence score", () => {
  test("returns 'low' for dependence score of 1 to 2", () => {
    const store = createStore(buildQuestionsWithSelectedOptions([1]))
    store.questions[0].options[0].toggleSelect()

    expect(store.dependenceGroup).toEqual("low")
  })

  test("returns 'medium' for dependence score of 3 to 4", () => {
    const store = createStore(buildQuestionsWithSelectedOptions([3]))
    store.questions[0].options[0].toggleSelect()

    expect(store.dependenceGroup).toEqual("medium")
  })

  test("returns 'medium' for dependence score of 5 to 6", () => {
    const store = createStore(buildQuestionsWithSelectedOptions([5]))
    store.questions[0].options[0].toggleSelect()

    expect(store.dependenceGroup).toEqual("high")
  })
})

describe("usedWillpowerAlone", () => {
  test("returns true if willpower option ticked", () => {
    const store = createStore(questions)
    const question3 = store.questions.find(q => q.id.toString() == "q3")

    expect(store.usedWillpowerAlone).toEqual(false)
    question3.options.find(o => o.id.toString() == "willpower").toggleSelect()
    expect(store.usedWillpowerAlone).toEqual(true)
  })
})

describe("usedEcigsOrVape", () => {
  test("returns true if ecigs option ticked", () => {
    const store = createStore(questions)
    const question3 = store.questions.find(q => q.id.toString() == "q3")

    expect(store.usedEcigsOrVape).toEqual(false)
    question3.options.find(o => o.id.toString() == "ecigs").toggleSelect()
    expect(store.usedEcigsOrVape).toEqual(true)
  })
})

describe("usedNRT", () => {
  test("returns true if NRT option ticked", () => {
    const store = createStore(questions)
    const question3 = store.questions.find(q => q.id.toString() == "q3")

    expect(store.usedNRT).toEqual(false)
    question3.options.find(o => o.id.toString() == "patches").toggleSelect()
    expect(store.usedNRT).toEqual(true)
  })
})

describe("planForExport", () => {
  const store = createStore(questions)
  const question1 = store.questions.find(q => q.id.toString() == "q1")
  const question2 = store.questions.find(q => q.id.toString() == "q2")
  const question3 = store.questions.find(q => q.id.toString() == "q3")

  question1.options.find(o => o.id.toString() == "within5mins").toggleSelect()
  question2.options.find(o => o.id.toString() == "30pluscigs").toggleSelect()
  question3.options.find(o => o.id.toString() == "patches").toggleSelect()
  question3.options.find(o => o.id.toString() == "willpower").toggleSelect()

  test("returns a json array of questions with options selected", () => {
    const expectedQuestions = [
      {
        id: "q1",
        selectedOptions: ["within5mins"]
      },
      {
        id: "q2",
        selectedOptions: ["30pluscigs"]
      },
      {
        id: "q3",
        selectedOptions: ["patches", "willpower"]
      }
    ]

    expect(store.planForExport.questions).toEqual(expectedQuestions)
  })

  test("returns a json array of recommendations", () => {
    const expectedSteps = [
      {
        title: "Great you're quitting!",
        intro: "You’re more likely to quit successfully with the right support. Using your willpower is important but you'll increase you're chances of success if you get some additional support.  Find out the best quit way for you to quit below.",
        recommendations: []
      },
      {
        title: "Find face-to-face support",
        intro: "Getting expert support will boost your chances of quitting.",
        recommendations: [
          {
            id: "lsss",
            title: "Local stop smoking service",
            body: "<p>The trained advisers at your local stop smoking service will give you expert support and advice, including what prescription medicines might be right for you.<p><p>Your local pharmacist and your GP can also give you loads of advice and support to help you quit.</p>",
            iconURL: ""
          }
        ]
      },
      {
        title: "Curb cravings with a combination",
        intro: "Combine long-lasting and fast-acting products for the most effective way to control your nicotine cravings.",
        recommendations: [
          {
            id: "ecigsnotused",
            title: "E-cigarettes or vapes",
            body: "<p>These are fast-acting and can really help you manage your nicotine cravings and they are at least 95% less harmful than cigarettes. Find out more about vapes/e-cigarettes [LINK TO NEW ARTICLE]. Your local specialist vape shop can find the right one for you. [Link to IBVA finder].</p>",
            iconURL: ""
          },
          {
            id: "patchesusedhigh",
            title: "Patches + Inhaler or Spray",
            body: "<p>You may have tried Nicotine Replacement Therapies [LINK TO NEW ARTICLE] before, they help you manage your nicotine cravings, but they are most effective when you combine them. It's important to use 2 different types of product as it will make it easier. Patches will deliver nicotine to your body throughout the day and an inhaler or spray will provide immediate relief from cravings.</p>",
            iconURL: ""
          }
        ]
      },
      {
        title: "Get free support tools",
        intro: "Try our range of free support tools to help keep you on track for the first 28 days - stay smokefree this long and you're 5 times as likely to quit smoking for good.",
        recommendations: [
          {
            id: "app",
            title: "Download the app",
            body: "<p>Track your progress, see how much you're saving and get daily support wherever you are. Download the app [Link to apps page]</p>",
            iconURL: ""
          },
          {
            id: "emailsupport",
            title: "Get daily email support",
            body: "<p>Stay focused with quitting advice and tips straight to your inbox throughout your 28-day journey! Get the email</p>",
            iconURL: ""
          },
          {
            id: "facebook",
            title: "Chat to us on Facebook",
            body: "<p>Chat to us on Facebook Messenger for instant support when you've got a craving. You can also join in the conversation on the Stoptober Facebook page [Link to Facebook page]. We're here to help you quit! Chat now [if user already has messenger] Download Messenger [if user needs to download messenger]</p>",
            iconURL: ""
          }
        ]
      }
    ]

    expect(store.planForExport.steps).toEqual(expectedSteps)
  })
})
