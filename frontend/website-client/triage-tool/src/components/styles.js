import styled from "styled-components"

const colors = {
  teal: "#138585",
  white: "#FFF"
}

const TriageToolContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 320px;
  min-height: 480px;

  background-color: ${colors.teal};
  color: ${colors.white};
`

const AccordionPanelContainer = styled.div`
  border-bottom: 1px solid ${colors.white};
  padding: 1em;
`

const Button = styled.a`
  padding: 0.5em;
  border: 1px solid ${colors.white};
`

export { TriageToolContainer, AccordionPanelContainer, Button }
