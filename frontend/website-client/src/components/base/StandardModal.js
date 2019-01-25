import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import './standard-modal.css';

const portalContainer = document.getElementById('root');

class StandardModal extends Component {

  constructor(props){
    super(props);
    this.modalRef = React.createRef();
  }

  openModal() {
    this.modalRef.current.open();
  }
  
  render() {
    return (  
      ReactDOM.createPortal(
        <PureModal
          key = "2"
          header=""
          footer=""
          onClose={() => {
            return true;
          }}
          isOpen={false}
          replace={false}
          ref={this.modalRef}
          className ="standard-modal"
        >
          {this.props.content}
        </PureModal>
        ,portalContainer
      ) 
    )
  }
}

StandardModal.propTypes = {
  variant: PropTypes.string,
  classNamePrefix: PropTypes.string,
  content: PropTypes.object
};

export default StandardModal;
