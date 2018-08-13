import "babel-polyfill"
import React from "react"
import ReactDOM from "react-dom"

import TriageTool from "./index"

const container = document.querySelector("#triage-tool")
ReactDOM.render(<TriageTool />, container)
