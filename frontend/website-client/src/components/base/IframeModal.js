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
      iframe_src: null,
      iframeIsLoaded: false,
      modalWidth: null
    };
    this.widthPercentage = 0.9;
    this.heightPercentage = 0.9;
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({
    isShowingModal: false,
    iframeIsLoaded: false,
    modalWidth: null
  })
  
  openModal(iframe_src) {
    this.setState({
        iframe_src: iframe_src
    });
    this.divElement.click();
  }

  _iframeLoaded(evt) {
    const document = evt.target.contentDocument;
    const backElement = document.getElementsByClassName('back')[0];
    backElement.parentNode.removeChild(backElement);
    
    const header = document.getElementsByClassName('results-header')[0].childNodes[0];
    header.parentNode.removeChild(header);

    const footer = document.getElementsByTagName('footer')[0];
    footer.parentNode.removeChild(footer);

    const container = document.getElementById('search-results').getElementsByClassName('body')[0].getElementsByClassName('container')[0];
    container.style.width = '100%';
    container.style.padding = '0';
 
    this.setState({
      iframeIsLoaded: true,
      modalWidth: window.innerWidth * this.widthPercentage
    });
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
            width={this.state.modalWidth}
          >
            {!this.state.iframeIsLoaded && <p>Loading...</p>}
            <div style={this.state.iframeIsLoaded ? {} : { display: 'none' }}>
              <iframe src={this.state.iframe_src} width="100%" frameBorder="0" height={window.innerHeight * this.heightPercentage} onLoad={(evt) => this._iframeLoaded(evt)}/>
            </div>
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
