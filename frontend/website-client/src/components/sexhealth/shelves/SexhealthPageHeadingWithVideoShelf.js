import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from '../../base/shelves/Shelf';
import PageHeadingShelf from '../../base/shelves/PageHeadingShelf';
import Text from '../../base/Text';
import CtaLink from '../../base/shared/CtaLink';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import ImageUtils from '../../base/panels/ImageUtils';
import ResponsiveImage from '../../base/shared/ResponsiveImage';
import ResponsiveBackgroundImage from '../../base/shared/ResponsiveBackgroundImage';
import ShelfUtils from '../../base/shared/ShelfUtils';
import VideoModal from '../../base/VideoModal';

import './sexhealth-page-heading-with-video-shelf.css';
// import '../../base/shelves/promo-shelf.css';

/**
 *  Sex HealthPage Heading Shelf displays a page header with optional background image,
 *  body text and oreground image
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    heading: "Learn More",
 *    body: "Some body text",
 *    background_image: "url to image",
 *    meta_layout: "image_bottom_left, image_bottom_right, image_top_right"
 *    image: "an image"
 *  }
 */
 
class SexhealthPageHeadingWithVideoShelf extends PageHeadingShelf {

  constructor(props) {
    super(props);
    this.video = React.createRef();
  }

  triggerModal = () => {
    this.video.current.openModal();
  }

  renderHeadingBody(content, headingTagName) {
    return [
      (<Text key="1" tagName={headingTagName} content={content.heading} />),
      (<Text key="2" content={content.body} format="richtext"/>)
    ];
  }

  renderCta(cta) {
    if (!cta) return null;
    return (<CtaLink variant="button" cta={cta} />);
  }

  render() {
    const { id, content, classNamePrefix, variant } = this.props;
    const metaVariant = content.meta_variant || variant;
    const gradient = content.meta_gradient || false;
    const headingTagName = (classNamePrefix === 'page-heading-shelf') ? 'h1' : 'h2';
    const leftImage = ImageUtils.isValid(content.image_left) ? ImageUtils.deviceImage(content.image_left) : null;
    const rightImage = ImageUtils.isValid(content.image_right) ? ImageUtils.deviceImage(content.image_right) : null;

    // Calculate styling to position the left and right images 
    const leftImageStyle = (content.image_left && content.image_left.meta_position === 'bottom')? 'left-image--bottom' : 'left-image--top';
    const rightImageStyle = (content.image_right && content.image_right.meta_position === 'bottom')? 'right-image--bottom' : 'right-image--top';
    
    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group} classExtra="sexhealth-page-heading-with-video-shelf">
        {content.video_id && <VideoModal video={content.video_id} host={content.host} classNamePrefix={classNamePrefix} ref={this.video} classExtra="sexhealth-video-modal">
        </VideoModal>}
        <ResponsiveBackgroundImage image={content.background_image} className={`shelf__container ${ShelfUtils.shelfContainerClass(content)} shelf-${leftImageStyle} shelf-${rightImageStyle} shelf__container-gradient--${gradient}`}
        >
          <div className="container">
            <div className={`${classNamePrefix}__container-left`}>
              <div className="row">
                <div className="shelf__col col-10 col-sm-8 col-md-7">
                  {this.renderHeadingBody(content, headingTagName)}
                  {this.renderCta(content.cta)}
                  {content.meta_use_play_link === true &&
                    <span role="button" onClick={this.triggerModal.bind(this)} className={`${classNamePrefix}__play-link`}>{content.meta_play_link_text}</span>
                  }
                </div>
              </div>
              { leftImage &&
                <div className={`${classNamePrefix}__${leftImageStyle}`}>
                  <ResponsiveImage image={leftImage} className={`${classNamePrefix}__image`} />
                </div> 
              }  
            </div>  
            <div className={`${classNamePrefix}__container-right`}>
              { rightImage &&
                <div className={`${classNamePrefix}__${rightImageStyle}`}>
                  <ResponsiveImage image={rightImage} className={`${classNamePrefix}__image`} />
                </div>
              }
            </div>      
          </div>
        </ResponsiveBackgroundImage>
      </Shelf>
    );
  }
}

SexhealthPageHeadingWithVideoShelf.propTypes = {
  ...PageHeadingShelf.propTypes
}

CmsComponentRegistry.register('sexhealth_page_heading_shelf_with_video', SexhealthPageHeadingWithVideoShelf, 'page-heading-shelf', null, null);

export default SexhealthPageHeadingWithVideoShelf;