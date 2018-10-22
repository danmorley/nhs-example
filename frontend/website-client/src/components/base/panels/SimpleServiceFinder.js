import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import Panel from './Panel';
import Text from '../../base/Text';
import PureModal from 'react-pure-modal';
import PropTypes from 'prop-types';
import IframeModal from '../IframeModal';
import './simple-service-finder.css';


class SimpleServiceFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postcode: null
    };
    this.iframe = React.createRef();
    // this.triggerModal = this.triggerModal.bind(this)
  }

  onKeyPress(evt) {
    if(evt.key === 'Enter'){
      console.log('Enter');
      this.triggerModal();
    }
  }

  triggerModal(){
    const iframeSrc = `${this.props.content.finder_url}?postcode=${this.state.postcode}`;
    this.iframe.current.openModal(iframeSrc);
  }

  updateInputPostcode(evt) {
    this.setState({
      postcode: evt.target.value
    });
  }

  getCurrentGeolocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const iframeSrc = `${this.props.content.finder_url}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;
      this.iframe.current.openModal(iframeSrc);
    });
  }

  render() {
    let { content, classNamePrefix } = this.props;

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <IframeModal ref={this.iframe} />
        {content.text && <Text tagName="div" content={content.text} format="richtext" className="rich-text" />}
        {content.heading && <h3>{content.heading}</h3>}
        {content.submit_button_copy && 
          <div>
            <input
              data-webtrends-id="Condom finder input"
              placeholder={content.searchbox_placeholder}
              type="text"
              onChange={evt => this.updateInputPostcode(evt)}
              onKeyPress={evt => this.onKeyPress(evt)}
            />
            <button onClick={this.triggerModal.bind(this)}>{content.submit_button_copy}</button>
          </div>
        }
        {content.use_location_button_copy && navigator.geolocation &&
          <button onClick={this.getCurrentGeolocation.bind(this)}>{content.use_location_button_copy}</button>
        }
      </Panel>
    );
  }
}

SimpleServiceFinder.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('simple_service_finder', SimpleServiceFinder, 'simple-service-finder', null, null);

export default SimpleServiceFinder;