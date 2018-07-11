import React from "react"
import ReactDOM from "react-dom"
import TriageTool from "./components/TriageTool"

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

const container = document.querySelector("#triage-tool")
ReactDOM.render(<TriageTool config={ config }/>, container)
