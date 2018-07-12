/* eslint-disable no-undef */

import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import TriageTool from "../TriageTool"
import config from "../../config"


Enzyme.configure({adapter: new Adapter()})

test("TriageTool is rendered with text", () => {
  const triageTool = mount(<TriageTool config={ config } />)

  expect(triageTool.text()).toContain("Quit smoking now!")
})

describe("displaying questions", () => {
  test("displays the question numbers on initial load", () => {
    const triageTool = mount(<TriageTool config={ config } />)

    expect(triageTool.text()).toContain("Question 1 out of 3")
    expect(triageTool.text()).toContain("Question 2 out of 3")
  })

  test("does not display the question text on initial load", () => {
    const triageTool = mount(<TriageTool config={ config } />)

    expect(triageTool.text()).not.toContain("After waking, how long before you first smoke a cigarette?")
  })

  test("displays the question text on click", () => {
    const triageTool = mount(<TriageTool config={ config } />)
    const questionAccordionPanel= triageTool.find({ heading: "Question 1 out of 3" }).find("header")

    questionAccordionPanel.simulate("click")
    expect(triageTool.text()).toContain("After waking, how long before you first smoke a cigarette?")
  })

  test("hides the question text on another question selection", () => {
    const triageTool = mount(<TriageTool config={ config } />)
    triageTool.find({ heading: "Question 1 out of 3" }).find("header").simulate("click")
    triageTool.find({ heading: "Question 2 out of 3" }).find("header").simulate("click")

    expect(triageTool.text()).not.toContain("After waking, how long before you first smoke a cigarette?")
  })
})

describe("displaying possible answers", () => {
  test("displays the answer options for the selected question", () => {
    const triageTool = mount(<TriageTool config={ config } />)
    const questionAccordionPanel= triageTool.find({ heading: "Question 1 out of 3" }).find("header")

    questionAccordionPanel.simulate("click")
    expect(triageTool.text()).toContain("6-30 minutes")
    expect(triageTool.text()).not.toContain("11-20")
  })

  test("displays the answer options as pre-defined input type", () => {
    const triageTool = mount(<TriageTool config={ config } />)
    const questionAccordionPanel = triageTool.find({ heading: "Question 1 out of 3" }).find("header")

    questionAccordionPanel.simulate("click")
    expect(triageTool.find({ value: "6-30 minutes" }).prop("type")).toEqual("radio")
  })
})
