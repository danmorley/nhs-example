import styled from "styled-components"

const colors = {
  teal: "#138585",
  yellow: "#ffcc00",
  black: "#000",
  white: "#fff"
}

const TriageToolContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 320px;
  min-height: 480px;

  background-color: ${colors.yellow};
  color: ${colors.white};
`

const AccordionPanelContainer = styled.div`
  border-bottom: 1px solid ${colors.white};
  padding: 1em;
`

const Button = styled.button`
  color: ${colors.white}
  text-align: center;
  background-color: ${colors.teal}
  padding: 10px 40px;
  display: block;
  border: 0;
  margin: 0 auto;
  font-size: 18px;

  &:hover, &:focus {
    cursor: pointer;
  }
`

const AppHeader = styled.h1`
  color: ${colors.black}
  text-align: center;
`

const AppIntro = styled.p`
  color: ${colors.black}
  text-align: center;
`

export { TriageToolContainer, AppHeader, AppIntro, AccordionPanelContainer, Button }
