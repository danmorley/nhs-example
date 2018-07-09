/* eslint-disable no-undef */

import React from "react"
import Enzyme, { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import TriageTool from "../TriageTool"


Enzyme.configure({adapter: new Adapter()})

test("TriageTool is rendered with text", () => {
  // calling 'children' as the top level element is styled-component
  const triageTool = shallow(<TriageTool />).children()

  expect(triageTool.text()).toEqual("This is the tool")
})
