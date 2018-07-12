import styled from "styled-components";
import { device } from './device';

const colors = {
  teal: "#138585",
  yellow: "#ffcc00",
  black: "#000",
  white: "#fff",
  grey: "#4a4a4a"
}

const fonts = {
  helvetica: "Helvetica, Liberation Sans, Arial, sans-serif"
}

const TriageToolContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 480px;

  background-color: ${colors.yellow};
  color: ${colors.white};
  font-family: ${fonts.helvetica};
`

const AccordionPanelContainer = styled.div`
  padding: 15px;
  background-color: ${props => props.backgroundColor};

  &:hover, &:focus {
    cursor: pointer;
  }

  header {
    border-bottom: 1px solid ${colors.white};
    padding-bottom: 10px;
  }

  div {
    margin-top: 15px;
  }

  ul {
    list-style-type: none;
    padding-left: 0;

    li {
      label {
        display: block;

        input {
          margin-right: 5px;
          position: relative;
          top: -2px;
          float: left;
          margin-left: 0;
        }
      }
    }
  }
`

const Button = styled.a`
  color: ${colors.white}
  text-align: center;
  background-color: ${colors.teal};
  padding: 10px;
  display: block;
  border: 0;
  margin: 0 auto;
  font-size: 18px;
  width: 100px;

  &:hover, &:focus {
    cursor: pointer;
    background-color: ${colors.grey};
  }
`

const AppHeader = styled.h1`
  color: ${colors.black}
  text-align: center;
`

const AppIntro = styled.p`
  color: ${colors.black}
  text-align: center;
  font-family: ${fonts.helvetica};
`

export { TriageToolContainer, AppHeader, AppIntro, AccordionPanelContainer, Button }
