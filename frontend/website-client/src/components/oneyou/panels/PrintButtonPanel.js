import React, { Component } from 'react';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import './print-button.css';
import Panel from '../panels/Panel';


class PrintButtonPanel extends Component {
  handleClick() {
    window.print();
  }

  render() {
    return (
      <Panel classNamePrefix="print-button-panel" variant="align-right">
        <div className="print-button" onClick={this.handleClick()} data-name="print-button">
          <span className="print-button__title">Print</span>
        </div>
      </Panel>
    );
  }
}

PrintButtonPanel.propTypes = {
};

CmsComponentRegistry.register('share_button_panel', PrintButtonPanel, 'share-button-panel');

export default PrintButtonPanel;
