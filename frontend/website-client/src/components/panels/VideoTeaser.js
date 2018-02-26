import React, { Component } from 'react';
import Shelf from '../shelves/Shelf';
import Text from '../Text';
import CtaLink from '../CtaLink';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './video-teaser.css';

import sampleBgImage from '../shelves/healthcheckup.png'; // Tell Webpack this JS file uses this image
import testImage from '../../assets/images/Trump2.jpg';

/**
 *
 *  content: {
 *
 *  }
 */
class VideoTeaser extends Component {
  render() {
    let { content, classNamePrefix } = this.props;
    let metaLayout = content.meta_layout || '';

    let backgroundImageShelfStyle = {
      backgroundImage: 'url(' + sampleBgImage + ')',
    };

    let backgroundTeaserImage = {
      backgroundImage: 'url(' + testImage + ')',
    };

    let backgroundColourShelfStyle = {
    };

    return (
      <div className="video-teaser">
        <div className="video-teaser__image" style = {backgroundTeaserImage}>
          {/* // needs alt text */}
        </div>
        <div className="video-teaser__info">
          <div className="video-teaser__heading">
            <Text tagName="h3" content={content.heading} />
          </div>
          <div className="video-teaser__text">
            <Text content={content.body} />
            <CtaLink link={content.cta_link}>{content.cta_link_label}</CtaLink>
          </div>
        </div>
      </div>
    );
  }
}

CmsComponentRegistry.register('video_teaser', VideoTeaser, 'video');

export default VideoTeaser;
