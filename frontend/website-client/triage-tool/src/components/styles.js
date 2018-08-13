import styled from "styled-components"
import { injectGlobal } from "styled-components"
import { device } from "./device"

const colors = {
  teal: "#138585",
  yellow: "#ffcc00",
  black: "#000",
  white: "#fff",
  grey: "#4a4a4a",
  lightteal: "#028586",
  red: "#840018"
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
  min-height: 360px;

  @media ${device.desktop && device.tablet} {
    min-height: 450px;
  }

  border: 5px solid ${colors.yellow};
  color: ${colors.white};
  font-family: ${fonts.helvetica};
  background-color: ${colors.lightteal};

  @media ${device.desktop && device.tablet} {
    box-shadow: 5px 5px 10px rgba(153, 153, 153, 0.2); 
    -webkit-box-shadow: 5px 5px 10px rgba(153, 153, 153, 0.2); 
    -moz-box-shadow: 5px 5px 10px rgba(153, 153, 153, 0.2); 
  } 

  .triage-tool {
    ul {
      list-style-type: none;
    }
  }
`

const AccordionPanelContainer = styled.div`
  display: ${props => props.hidden ? "none" : "block"};
  padding: 15px;
  background-color: ${props => props.backgroundColor};

  &:hover, &:focus {
    cursor: pointer;
  }

  header {
    div {
      margin-top: 0;
      border-top: 0;

      p {
        position: relative;
        margin: 0;
        text-align: left;
        padding-top: 0;
      }
    }
  }

  div {
    margin-top: 15px;
    border-top: 1px solid ${colors.white};

    h2 {
      text-align: left;
      margin: 15px 0;
      line-height: 140%;
      border-bottom: 1px solid ${colors.white};
      padding-bottom: 15px;
      font-size: 18px;
      color: ${colors.white};

      @media ${device.desktop && device.tablet} {
        width: 70%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        border-bottom: 0;
        font-size: 28px;
        padding-top: 15px;
        padding-bottom: 5px;
      }
    }

    p {
      margin-bottom: 0;
      padding-top: 15px;

      @media ${device.desktop && device.tablet} {
        text-align: center;
        padding-top: 0;
      }
    }
  }
`

const Button = styled.a`
  color: ${ props => props.secondary ? colors.white : colors.black };
  text-align: center;
  background-color: ${ props => props.secondary ? colors.red : colors.yellow };
  padding: 10px 10px 5px;
  display: block;
  border: 0;
  margin: 0 auto;
  font-size: 21px;
  width: 280px;
  font-family: 'OneYouSansBold';

  &:hover, &:focus {
    cursor: pointer;
    background-color: ${colors.grey};
    color: ${colors.white};
  }
`

const OpenIndicator = styled.span`
  position: absolute;
  right: 0;
  top: -12px;
`

const AppHeader = styled.h1`
  color: ${colors.white};
  text-align: center;
  font-family: 'OneYouSansBold';
  font-size: 24px;

  @media ${device.desktop && device.tablet} {
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    font-size: 32px;
  }
`

const AppIntro = styled.p`
  color: ${colors.white}
  text-align: center;
  font-family: ${fonts.helvetica};
  margin-bottom: 30px;
  line-height: 150%;

  @media ${device.desktop && device.tablet} {
    width: 40%;
    margin-left: auto;
    margin-right: auto;
  }
`

const PlanContainer = styled.div`
  div {
    border-top: 0;

    h2 {
      border-top: 0;
      text-transform: uppercase;
    }
  }
`

const sharedList = `
  padding-left: 0;
  list-style-type: none;
  padding-top: 15px;

  li {
    label {
      position: relative;
      padding-left: 35px;
      padding-top: 6px;

      input {
        margin-right: 5px;
        position: relative;
        top: -2px;
        float: left;
        margin-left: 0;
      }

      input[type=radio], input[type=checkbox] {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        border: 1px solid ${colors.white};
        border-radius: 50%;

        &:after {
          content: "";
          position: absolute;
          display: none;
        }
      }

      &:hover input ~ .checkmark {
        background-color: ${colors.white};
      }

      &:hover, &:focus {
        cursor: pointer;
      }

      input:checked ~ .checkmark {
        background-color: ${colors.white};

        &:after {
          display: block;
        }
      }
    }
  }
`

const RadiobuttonList = styled.ul`
  ${ sharedList }

  @media ${device.desktop && device.tablet} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    padding-top: 5px;
  }

  li {
    padding-bottom: 30px;

    @media ${device.desktop && device.tablet} {
      padding-right: 25px;
      padding-bottom: 0;
    }
  }
`

const CheckboxList = styled.ul`
  ${ sharedList }
  margin-bottom: 30px;

  display: grid;
  display: -ms-grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  -ms-grid-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-auto-rows: minmax(10px, auto);
  -ms-grid-rows: minmax(10px, auto);
  grid-gap: 10px;

  li {
    display: flex;
    grid-column: span 2;
    -ms-grid-column: span 2;
    padding-bottom: 15px;

    @media ${device.desktop && device.tablet} {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
`

export { TriageToolContainer, AppHeader, AppIntro, AccordionPanelContainer,
  Button, OpenIndicator, PlanContainer, CheckboxList, RadiobuttonList }
