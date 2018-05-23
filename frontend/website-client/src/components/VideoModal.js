import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PureModal from 'react-pure-modal';
import BrightcoveVideo from './BrightcoveVideo';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import './video-modal.css';

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

  renderVideo(video) {
    if (!video) return null;
    return (<BrightcoveVideo video={video} />);
  }

  render() {
    return [
      <div key="1" onClick={() => this.refs.modal.open() }>{this.props.children}</div>,
      <PureModal
        key = "2"
        header=""
        footer=""
        onClose={() => {
          console.log('handle closing');
          return true;
        }}
        isOpen={false}
        replace={false}
        ref="modal"
      >
        {this.renderVideo(this.props.video)}
      </PureModal>
    ];
  }
}

VideoModal.propTypes = {
  video: PropTypes.string.isRequired,
  variant: PropTypes.string
};

export default VideoModal;
