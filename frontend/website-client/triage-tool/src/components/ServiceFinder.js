/* eslint-disable no-undef */

import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"

import { Button, ServiceFinderContainer } from "./styles"

class ServiceFinder extends Component {
  constructor(props) {
    super(props)
    this.state = { searchLocation: "", suggestions: [] }

    this.suggestLocation = this.suggestLocation.bind(this)
  }

  suggestLocation(event) {
    const newLocation = event.target.value
    this.setState({ searchLocation: newLocation })
    if (newLocation.length < 2) {
      this.setState({ suggestions: [] })
      return
    }

    const url = `https://nhsukpoc.search.windows.net/indexes/opennameslookup-index/docs/suggest?suggesterName=postcodeandnames-suggester&search=${ newLocation }&$top=10&searchFields=Name1&$select=UniqueKey%2CName1%2CLatitude%2CLongitude&api-version=2016-09-01`
    const requestOptions = {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "api-key": process.env.NHS_FLEXIFINDER_API_KEY,
        "Content-Type": "application/json; charset=UTF-8"
      }
    }

    fetch(url, requestOptions).then(response => {
      response.json().then(data => {
        const postcodes = data.value.map(r => r.Name1)
        this.setState({ suggestions: postcodes })
      })
    })
  }

  render() {
    const suggestions = this.state.suggestions.map((suggestion, i) => {
      return <option key={ i } value={ suggestion }/>
    })

    return (
      <ServiceFinderContainer>
        <datalist id="service-finder-suggestions">
          { suggestions }
        </datalist>
        <input
          placeholder="Enter postcode"
          list="service-finder-suggestions"
          onChange={ this.suggestLocation }
          value={ this.state.searchLocation }
        />
        <Button>Find</Button>
      </ServiceFinderContainer>
    )
  }
}

ServiceFinder.propTypes = {
  store: PropTypes.object
}

export default observer(ServiceFinder)
