import "babel-polyfill"
import React, { Component } from "react"
import { onSnapshot, applySnapshot } from "mobx-state-tree"

import TriageTool from "./components/TriageTool"
import { questions } from "./config"
import TriageStore from "./triage-store"

const triageStore = TriageStore.create({
  currentPanel: 0, questions: questions
})

const storageKey = "nhs-stoptober-triage-tool"

if (storageKey in localStorage) {
  applySnapshot(triageStore,
    JSON.parse(localStorage.getItem(storageKey)))
}

onSnapshot(triageStore, newSnapshot => {
  localStorage.setItem(storageKey, JSON.stringify(newSnapshot))
})

export function resetLocalStorage() {
  localStorage.removeItem(storageKey)
}

export default class TriageToolWrapper extends Component {
  render() {
    return <TriageTool store={ triageStore }></TriageTool>
  }
}
