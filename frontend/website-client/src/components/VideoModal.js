import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PureModal from 'react-pure-modal';
import BrightcoveVideo from './BrightcoveVideo';
import WirewaxVideo from './WirewaxVideo';
import ReactDOM from 'react-dom';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import './video-modal.css';

const BRIGHTCOVE_HOST = 'brightcove';
const WIREWAX_HOST = 'wirewax';
const portalContainer = document.getElementById('root');

class VideoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})
  
  openModal() {
    this.divElement.click()
  }
  
  renderVideo(video, host) {
    if (!video) return null;
    if (host === BRIGHTCOVE_HOST) {
      return (<BrightcoveVideo video={video} />);
    } else if (host === WIREWAX_HOST) {
      return (<WirewaxVideo video={video} />);
    } else {
      return null;
    }
  }

  render() {
    return (  
       [
        <div key="1" ref={div => this.divElement = div} onClick={() => this.refs.modal.open() } className={`${this.props.classNamePrefix}__image`} style={this.props.image}>{this.props.children}</div>,
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
          >
            {this.renderVideo(this.props.video, this.props.host)}
          </PureModal>
          ,portalContainer
        ) 
      ]
    )
  }
}

VideoModal.propTypes = {
  video: PropTypes.string.isRequired,
  variant: PropTypes.string,
  host: PropTypes.string,
  classNamePrefix: PropTypes.string,
  image: PropTypes.string
};

export default VideoModal;
