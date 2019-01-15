import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from '../../base/shelves/Shelf';
import Text from '../../base/Text';
import CtaLink from '../../base/shared/CtaLink';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import './page-heading-shelf.css';
import ImageUtils from '../../base/panels/ImageUtils';
import ResponsiveImage from '../shared/ResponsiveImage';
import ResponsiveBackgroundImage from '../shared/ResponsiveBackgroundImage';
import ShelfUtils from '../shared/ShelfUtils';

/**
 *  Page Heading Shelf displays a page header with optional background image,
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
 
class PageHeadingShelf extends Component {
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
    const headingTagName = (classNamePrefix === 'page-heading-shelf') ? 'h1' : 'h2';
    const leftImage = ImageUtils.isValid(content.image_left) ? ImageUtils.deviceImage(content.image_left) : null;
    const rightImage = ImageUtils.isValid(content.image_right) ? ImageUtils.deviceImage(content.image_right) : null;

    // Calculate styling to position the left and right images 
    const leftImageStyle = (content.image_left && content.image_left.meta_position === 'bottom')? 'left-image--bottom' : 'left-image--top';
    const rightImageStyle = (content.image_right && content.image_right.meta_position === 'bottom')? 'right-image--bottom' : 'right-image--top';
    
    console.log("-------------------");
    console.log(content);
    console.log(content.background_image);
    console.log(content.background_image.meta_variant);
    console.log("-------------------");

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
        <ResponsiveBackgroundImage 
          image={content.background_image} 
          className={`shelf__container ${ShelfUtils.shelfContainerClass(content)} shelf-${leftImageStyle} shelf-${rightImageStyle}`}
          variant={content.background_image.meta_variant}
        >
          <div className="container">
            <div className={`${classNamePrefix}__container-left`}>
              <div className="row">
                <div className="shelf__col col-10 col-sm-8 col-md-7">
                  {this.renderHeadingBody(content, headingTagName)}
                  {this.renderCta(content.cta)}
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

PageHeadingShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  id: PropTypes.string
}

CmsComponentRegistry.register('page_heading_shelf', PageHeadingShelf, 'page-heading-shelf', 'home-page');

export default PageHeadingShelf;
