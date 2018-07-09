/* eslint-disable no-undef */

import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import TriageTool from "../TriageTool"


Enzyme.configure({adapter: new Adapter()})

const config = {
  "questions": [
    {
      "text": "After waking, how long before you first smoke a cigarette?"
    },
    {
      "text": "How many cigarettes do you smoke per day?"
    }
  ]
}

test("TriageTool is rendered with text", () => {
  // calling 'children' as the top level element is styled-component
  const triageTool = mount(<TriageTool config={ config } />)

  expect(triageTool.text()).toContain("Triage Tool")
})

describe("displaying questions", () => {
  test("displays the question numbers on initial load", () => {
    const triageTool = mount(<TriageTool config={ config } />)

    expect(triageTool.text()).toContain("Question 1 out of 2")
    expect(triageTool.text()).toContain("Question 2 out of 2")
  })

  test("does not display the question text on initial load", () => {
    const triageTool = mount(<TriageTool config={ config } />)

    expect(triageTool.text()).not.toContain("After waking, how long before you first smoke a cigarette?")
  })

  test("displays the question text on click", () => {
    const triageTool = mount(<TriageTool config={ config } />)
    const questionAccordionPanel= triageTool.find({ heading: "Question 1 out of 2" }).find("header")

    questionAccordionPanel.simulate("click")
    expect(triageTool.text()).toContain("After waking, how long before you first smoke a cigarette?")
  })

  test("hides the question text on another question selection", () => {
    const triageTool = mount(<TriageTool config={ config } />)
    triageTool.find({ heading: "Question 1 out of 2" }).find("header").simulate("click")
    triageTool.find({ heading: "Question 2 out of 2" }).find("header").simulate("click")

    expect(triageTool.text()).not.toContain("After waking, how long before you first smoke a cigarette?")
  })
})
