import React, { Component } from 'react';
import Text from '../Text';
import CtaLink from '../shared/CtaLink';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './video-teaser.css';
import Panel from './Panel';
import PropTypes from 'prop-types';
import ImageUtils from './ImageUtils';
import BrightcoveVideo from '../BrightcoveVideo';
import VideoModal from '../VideoModal';
import Image from '../Image';

/**
 *  Video Teaser panel component, that provides 'teaser' details for a video_teaser
 *  that will open and play in a popup modal window when the user clicks the static
 *  teaser.
 *
 *  content: {
 *    heading: 'Walk the walk, talk the talk',
 *    body: 'Share walking stories and your progress with others online',
 *    video: '5669668082001',
 *    image: {
 *      title: 'Image name',
 *      link: 'https://blob store url'
 *    },
 *    cta: {
 *      link_text: 'Find out more',
 *      link_external: 'http://www.somewebsite.co.uk'
 *    }
 *  }
 */
class VideoTeaserPanel extends Component {
  render() {
    let { content, classNamePrefix } = this.props;
    let backgroundTeaserImage = ImageUtils.backgroundImageStyle(content.image, ImageUtils.placeholderImage());

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className={`${classNamePrefix}__image`} style={backgroundTeaserImage}>
          <VideoModal video={content.video}>
          </VideoModal>
        </div>
        <div className={`${classNamePrefix}__info`}>
          <Text tagName="h3" content={content.heading}  className={`${classNamePrefix}__heading`} />
          <div className={`${classNamePrefix}__text`}>
            <Text content={content.body} className={`${classNamePrefix}__body`} format="html"/>
            <CtaLink cta={content.cta} />
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
