/* eslint-disable no-undef */

import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import Autocomplete from "react-autocomplete"

import { Button, ServiceFinderContainer } from "./styles"

class ServiceFinder extends Component {
  constructor(props) {
    super(props)
    const defaultLocation = {
      label: "",
      latitude: "",
      longitude: ""
    }

    this.state = {
      searchTerm: "",
      searchLocation: defaultLocation,
      suggestions: []
    }

    this.suggestLocation = this.suggestLocation.bind(this)
    this.findServices = this.findServices.bind(this)
    this.setLocation = this.setLocation.bind(this)
  }

  suggestLocation(event) {
    const newLocation = event.target.value
    this.setState({ searchTerm: newLocation })
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
        let postcodes = data.value.map(r => {
          return {
            label: r.Name1,
            latitude: r.Latitude,
            longitude: r.Longitude
          }
        })
        console.dir(postcodes)
        this.setState({ suggestions: postcodes })
      })
    })
  }

  findServices() {
    console.log(this.state.searchLocation)
    const { latitude, longitude } = this.state.searchLocation

    const url = `https://nhsukpoc.search.windows.net/indexes/organisationlookup3-index/docs/search?api-version=2016-09-01`
    const requestOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "api-key": process.env.NHS_FLEXIFINDER_API_KEY,
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        "search": "*",
        "filter": "ServicesProvided/any(p: p eq 'Stop smoking support services')",
        "orderby": `geo.distance(Geocode, geography'POINT(${longitude} ${latitude})')`,
        "top": 20,
        "count": true
      })
    }

    fetch(url, requestOptions).then(response => {
      response.json().then(data => {
        console.dir(data)
      })
    })
  }

  setLocation(label, locationItem) {
    this.setState({
      searchTerm: label,
      searchLocation: locationItem
    })
  }

  render() {
    return (
      <ServiceFinderContainer>
        <Autocomplete
          inputProps={{ placeholder: "Enter postcode" }}
          onChange={ this.suggestLocation }
          onSelect={ this.setLocation }
          value={ this.state.searchTerm }
          getItemValue={ item => item.label }
          items={ this.state.suggestions }
          renderItem={ (item, isHighlighted) =>
            <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
              { item.label }
            </div>
          }
        />
        <Button onClick={ this.findServices }>Find</Button>
      </ServiceFinderContainer>
    )
  }
}

ServiceFinder.propTypes = {
  store: PropTypes.object
}

export default observer(ServiceFinder)
