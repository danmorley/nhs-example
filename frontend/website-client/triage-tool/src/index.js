import React, { Component } from "react"
import TriageTool from "./components/TriageTool"
import { questions } from "./config"
import TriageStore from "./triage-store"

const triageStore = TriageStore.create({
  currentPanel: 0, questions: questions
})

export default class TriageToolWrapper extends Component {
  render() {
    return <TriageTool store={ triageStore }></TriageTool>
  }
}
