import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import CtaLinks from '../shared/CtaLinks';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './video-teaser.css';
import Panel from './Panel';
import ImageUtils from './ImageUtils';
import VideoModal from '../VideoModal';

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
  constructor(props) {
    super(props);
    this.state = {
      backgroundImageStyle: null
    }
    
    this.video = React.createRef();
  }

  setImage() {
    this.setState({
      backgroundImageStyle: ImageUtils.backgroundImageStyle(
        this.props.content.image,
        ImageUtils.placeholderBackgroundImage()
      )
    })
  }

  componentDidMount() {
    this.setImage();
    window.addEventListener('resize', this.setImage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setImage);
  }
  
  triggerModal = () => {
    this.video.current.openModal();
  }
  
  render() {
    let { content, classNamePrefix } = this.props;
    let backgroundTeaserImage = this.state.backgroundImageStyle;
    let mobileImagePosition = "mobile-image-left";
    let desktopImagePosition = "desktop-image-left";
    
    if (content.meta_layout_desktop === 'desktop_image_left') {
      desktopImagePosition = "desktop-image-left"
    }
    else if (content.meta_layout_desktop === 'desktop_image_top') {
      desktopImagePosition = "desktop-image-top"
    }
    
    if (content.meta_layout_mobile === 'mobile_image_left') {
      mobileImagePosition = "mobile-image-left"
    }
    else if (content.meta_layout_mobile === 'mobile_image_top') {
      mobileImagePosition = "mobile-image-top"
    }     
     
    let layout = mobileImagePosition + '-' +  desktopImagePosition;

    if (content.meta_use_play_link === true){
      layout += ' video-play-link-true';
    } 
    else {
      layout += ' video-play-link-false';
    }

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant} layout={layout}>
        <VideoModal video={content.video} host={content.host} classNamePrefix={classNamePrefix} image={backgroundTeaserImage} ref={this.video}>
        </VideoModal>
        
        {content.heading && content.body && 
          <div className={`${classNamePrefix}__info`}>
            <Text tagName="h3" content={content.heading}  className={`${classNamePrefix}__heading`} />

            <div className={`${classNamePrefix}__text`}>
              <Text content={content.body} className={`${classNamePrefix}__body`} format="richtext"/>

              {content.meta_use_play_link === true &&
                <span role="button" onClick={this.triggerModal.bind(this)} className={`${classNamePrefix}__play-link`}>{content.meta_play_link_text}</span>
              }

              <CtaLinks cta={content.cta} />
            </div>
          </div>
        }
      </Panel>
    );
  }
}

VideoTeaserPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  layout: PropTypes.object,
  id: PropTypes.string
};

CmsComponentRegistry.register('video_teaser', VideoTeaserPanel, 'video-teaser');

export default VideoTeaserPanel;
