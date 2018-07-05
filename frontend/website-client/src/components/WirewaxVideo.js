import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WirewaxVideo extends Component {
  render() {
    let { video, ...rest } = this.props;
    console.log(10)
    if (!video) return null;

    return (
      <div {...rest}>
        <iframe className='video-js' src={`//embed.wirewax.com/${video}`} frameBorder="0" id="video"></iframe>
      </div>
    );
  }
}

WirewaxVideo.propTypes = {
  video: PropTypes.string.isRequired,
  variant: PropTypes.string
};

export default WirewaxVideo;
