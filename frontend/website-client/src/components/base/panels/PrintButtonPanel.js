import React, { Component } from 'react';
import './print-button.css';
import Panel from '../../base/panels/Panel';


class PrintButtonPanel extends Component {
  handleClick() {
    window.print();
  }

  render() {
    return (
      <Panel classNamePrefix="print-button-panel" variant="align-right">
        <div className="print-button" onClick={this.handleClick.bind(this)} data-name="print-button">
          <span className="print-button__title">Print</span>
        </div>
      </Panel>
    );
  }
}

PrintButtonPanel.propTypes = {
};

export default PrintButtonPanel;
