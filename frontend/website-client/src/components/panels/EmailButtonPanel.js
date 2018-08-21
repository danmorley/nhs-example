import React, { Component } from 'react';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './email-button.css';
import Panel from '../panels/Panel';
import ActionPlanContactForm from '../ActionPlanContactForm';
import StandardModal from '../StandardModal';


class EmailButtonPanel extends Component {
  
  constructor(props) {
    super(props);
    this.modal = React.createRef();
  }
  
  triggerModal = () => {
    this.modal.current.openModal();
  }
  
  render() {
    return (
      <Panel classNamePrefix="email-button-panel" variant="align-right">
        <div onClick={this.triggerModal.bind(this)} className="email-button">
          <span className="email-button__title">Email</span>
        </div>
        <StandardModal content = {<ActionPlanContactForm />}  ref={this.modal}/>
      </Panel>
    );
  }
}

EmailButtonPanel.propTypes = {
};

CmsComponentRegistry.register('share_button_panel', EmailButtonPanel, 'share-button-panel');

export default EmailButtonPanel;
