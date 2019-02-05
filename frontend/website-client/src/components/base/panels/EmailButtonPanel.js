import React, { Component } from 'react';
import './email-button.css';
import Panel from '../../base/panels/Panel';
import ActionPlanContactForm from '../../oneyou/ActionPlanContactForm';
import StandardModal from '../../base/StandardModal';


class EmailButtonPanel extends Component {
  
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }
  
  triggerModal = () => {
    this.modalRef.current.openModal();
  }
  
  render() {
    return (
      <Panel classNamePrefix="email-button-panel" variant="align-right">
        <div onClick={this.triggerModal.bind(this)} className="email-button" data-name="email-button">
          <span className="email-button__title">Email</span>
        </div>
        <StandardModal content={<ActionPlanContactForm {...this.props} />} ref={this.modalRef}/>
      </Panel>
    );
  }
}

EmailButtonPanel.propTypes = {
};

export default EmailButtonPanel;
