import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PureModal from 'react-pure-modal';
import ReactDOM from 'react-dom';
import 'react-pure-modal/dist/react-pure-modal.min.css';

//createElement is used for testing, as the root element does not exist.
const portalContainer = document.getElementById('root') ? document.getElementById('root') : document.createElement('div');

class IframeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      iframe_src: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})
  
  openModal(iframe_src) {
    this.setState({
        iframe_src: iframe_src
    });
    this.divElement.click()
  }


  render() {
    return (  
       [
        <div key="1" ref={div => this.divElement = div} onClick={() => this.refs.modal.open() }>{this.props.children}</div>,
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
            ref="modal"
            className ="iframe-modal"
            width="90%"
          >
            <iframe src={this.state.iframe_src} width="100%" frameBorder="0" />
          </PureModal>
          ,portalContainer
        ) 
      ]
    )
  }
}

IframeModal.propTypes = {
  variant: PropTypes.string
};

export default IframeModal;
