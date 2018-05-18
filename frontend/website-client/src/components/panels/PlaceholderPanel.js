import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CmsComponentRegistry from '../CmsComponentRegistry';
import Panel from './Panel';
import styles from './panels.css';

class PlaceholderPanel extends Component {
  render() {
    return (
      <Panel id={this.props.id} classNamePrefix="placeholder">
        <div className="col-sm-12 panel__placeholder">
          <h2>Placeholder</h2>
          <p>This is a temporary placeholder for a panel of type: {this.props.panelType}</p>
        </div>
      </Panel>
    );
  }
}

PlaceholderPanel.propTypes = {
  panelType: PropTypes.string.isRequired,
  id: PropTypes.string
}

CmsComponentRegistry.register('placeholder_panel', PlaceholderPanel);

export default PlaceholderPanel;
