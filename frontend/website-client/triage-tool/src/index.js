import React from "react"
import ReactDOM from "react-dom"
import TriageTool from "./components/TriageTool"
import config from "./config"

const container = document.querySelector("#triage-tool")
ReactDOM.render(<TriageTool config={ config }/>, container)
