import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BrightcoveVideo extends Component {
  render() {
    let { video, ...rest } = this.props;
    if (!video) return null;

    let brightcoveAccount = '4934638104001';
    let brightcovePlayer = 'SJlzlxhi';

    return (
      <div {...rest}>
        <video dataVideoId={video}
           dataAccount={brightcoveAccount}
           dataPlayer={brightcovePlayer}
           dataEmbed="default"
           dataApplicationId
           className="video-js"
           controls>
        </video>
        <script src={`//players.brightcove.net/${brightcoveAccount}/${brightcovePlayer}_default/index.min.js`}></script>
      </div>
    );
  }
}

BrightcoveVideo.propTypes = {
  video: PropTypes.object.isRequired,
  variant: PropTypes.string
};

export default BrightcoveVideo;
