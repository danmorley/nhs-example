import React from "react"
import ReactDOM from "react-dom"
import TriageTool from "./components/TriageTool"
import { questions } from "./config"
import TriageStore from "./triage-store"

const triageStore = TriageStore.create({
  currentPanel: 0, questions: questions
})

const container = document.querySelector("#triage-tool")
ReactDOM.render(<TriageTool store={ triageStore } />, container)
