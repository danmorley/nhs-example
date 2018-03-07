import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BrightcoveVideo extends Component {
  brightcoveAccount = '4934638104001';
  brightcovePlayer = 'SJlzlxhi';

  loadScript(src) {
    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    // document.getElementsByTagName('body').appendChild(tag);
    document.body.appendChild(tag);
  }

  componentDidMount() {
    this.loadScript(`//players.brightcove.net/${this.brightcoveAccount}/${this.brightcovePlayer}_default/index.min.js`);
  }

  render() {
    let { video, ...rest } = this.props;
    if (!video) return null;

    return (
      <div {...rest}>
        <video data-video-id={video}
           data-account={this.brightcoveAccount}
           data-player={this.brightcovePlayer}
           data-embed="default"
           data-application-id
           className="video-js"
           controls>
        </video>

      </div>
    );
  }
}

BrightcoveVideo.propTypes = {
  video: PropTypes.string.isRequired,
  variant: PropTypes.string
};

export default BrightcoveVideo;
