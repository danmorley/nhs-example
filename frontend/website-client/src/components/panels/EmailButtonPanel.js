import React, { Component } from 'react';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './email-button.css';
import Panel from '../panels/Panel';


class EmailButtonPanel extends Component {
  render() {
    return (
      <Panel classNamePrefix="email-button-panel" variant="align-right">
        <div className="email-button">
          <span className="email-button__title">Email</span>
        </div>
      </Panel>
    );
  }
}

EmailButtonPanel.propTypes = {
};

CmsComponentRegistry.register('share_button_panel', EmailButtonPanel, 'share-button-panel');

export default EmailButtonPanel;
