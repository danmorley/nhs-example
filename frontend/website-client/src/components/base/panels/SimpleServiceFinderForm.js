import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CmsComponentRegistry from '../CmsComponentRegistry';
import Panel from './Panel';
import Text from '../Text';
import PureModal from 'react-pure-modal';
import PropTypes from 'prop-types';
import IframeModal from '../IframeModal';
import './simple-service-finder.css';


class SimpleServiceFinderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postcode: null,
      lat: null,
      lon: null
    };
    
    this.form = React.createRef();
    this.lat = React.createRef();
    this.lon = React.createRef();
  }

  getCurrentGeolocation(t) {
    t.preventDefault();
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ lat: position.coords.latitude, lon: position.coords.longitude });
      this.lat.current.value = position.coords.latitude;
      this.lon.current.value = position.coords.longitude;
      this.form.current.submit();
    });
  }

  render() {
    let { content, classNamePrefix } = this.props;

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        {content.text && <Text tagName="div" content={content.text} format="richtext" className="rich-text" />}
        {content.submit_button_copy && 
          <div>
            <form ref={this.form} id="finder" name="finder" method="get" action={content.finder_url} >
              <fieldset>
                <legend>{content.heading && <h3>{content.heading}</h3>}</legend>
                <input data-name="Condom finder input" name="postcode" placeholder={content.searchbox_placeholder} type="text" required />
              </fieldset>
              <input ref={this.lat} name="latitude" type="hidden" />
              <input ref={this.lon} name="longitude" type="hidden" />
              <button className="sexualhealth-search" data-name="Condom finder search" form="finder" id="postcodeSearch" type="submit" value="Submit">{content.submit_button_copy}</button>
              {content.use_location_button_copy && navigator.geolocation &&
                <button onClick={this.getCurrentGeolocation.bind(this)} data-name="Condom finder Geo Search" form="finder" id="geoSearch" type="submit" value="LatLon">{content.use_location_button_copy}</button>
              }
            </form>
          </div>
        }
      </Panel>
    );
  }
}

SimpleServiceFinderForm.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('simple_service_finder', SimpleServiceFinderForm, 'simple-service-finder', null, null);

export default SimpleServiceFinderForm;