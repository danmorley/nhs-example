import styled from "styled-components"
import { injectGlobal } from "styled-components"
import { device } from "./device"

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

injectGlobal`
    @font-face {
      font-family: 'OneYouSansBold';
      src: url('./fonts/one_you-sans-bold.woff2') format('woff2'),
      url('./fonts/one_you-sans-bold.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: 'OneYouSansRegular';
      src: url('./fonts/one_you-sans-regular.woff2') format('woff2'),
      url('./fonts/one_you-sans-regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: 'OneYouScriptBold';
      src: url('./fonts/one_you-script-bold.woff2') format('woff2'),
      url('./fonts/one_you-script-bold.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
  }
`

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
    div {
      margin-top: 0;

      p {
        border-bottom: 1px solid ${colors.white};
        padding-bottom: 10px;
        position: relative;
        margin: 0;
      }
    }
  }

  div {
    margin-top: 15px;
  }

  h2 {
    text-align: center;
    margin: 45px 0;
  }

  ul {
    padding-left: 0;
    list-style-type: none;

    @media ${device.desktop && device.tablet} {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;
    }

    li {
      padding-bottom: 10px;
      
      @media ${device.desktop && device.tablet} {
        padding-right: 15px;
      }

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

const OpenIndicator = styled.span`
  position: absolute;
  right: 0;
  top: -10px;
`

const AppHeader = styled.h1`
  color: ${colors.black}
  text-align: center;
  font-family: 'OneYouSansBold';
`

const AppIntro = styled.p`
  color: ${colors.black}
  text-align: center;
  font-family: ${fonts.helvetica};
`

const PlanContainer = styled.div`
  color: ${colors.black}

  h2 {
    text-transform: uppercase;
  }
`

export { TriageToolContainer, AppHeader, AppIntro, AccordionPanelContainer,
  Button, OpenIndicator, PlanContainer }
