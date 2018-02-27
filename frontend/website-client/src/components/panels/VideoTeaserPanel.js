import React, { Component } from 'react';
import Text from '../Text';
import CtaLink from '../CtaLink';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './video-teaser.css';
import Panel from './Panel';
import PropTypes from 'prop-types';

// import sampleBgImage from '../shelves/healthcheckup.png'; // Tell Webpack this JS file uses this image
import testImage from '../../assets/images/Trump2.jpg';

/**
 *
 *  content: {
 *
 *  }
 */
class VideoTeaserPanel extends Component {
  render() {
    let { content, classNamePrefix } = this.props;

    let backgroundTeaserImage = {
      backgroundImage: 'url(' + testImage + ')',
    };

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className={`${classNamePrefix}__image`} style={backgroundTeaserImage}>
          {/* // needs alt text */}
        </div>
        <div className={`${classNamePrefix}__info`}>
          <Text tagName="h3" content={content.heading}  className={`${classNamePrefix}__heading`} />
          <div className={`${classNamePrefix}__text`}>
            <Text content={content.body} className={`${classNamePrefix}__body`}/>
            <CtaLink link={content.cta_link}>{content.cta_link_label}</CtaLink>
          </div>
        </div>
      </Panel>
    );
  }
}

VideoTeaserPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired
};

CmsComponentRegistry.register('video_teaser', VideoTeaserPanel, 'video-teaser');

export default VideoTeaserPanel;
