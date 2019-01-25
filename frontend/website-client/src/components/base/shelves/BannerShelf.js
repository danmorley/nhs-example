import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from './Shelf';
import Text from '../Text';
import Image from '../Image';
// import CtaLink from '../shared/CtaLink';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './banner-shelf.css';
import ShelfUtils from '../shared/ShelfUtils';
import Banner from '../shared/Banner';
import ImageUtils from '../panels/ImageUtils';

/**
 *  Banner Shelf is a simple shelf that can be used to display content
 *  from the basic_cta_shelf type Wagtail streamfield.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    heading: "Learn More",
 *    body: "Some body text",
 *    background_image: "url to image",
 *    field_id: "learn-more-shelf"
 *  }
 * 
 *  Layouts:
 *    image_on_left: 
 */
class BannerShelf extends Component {
  renderImage(image, classname) {
    return (<Image image={image} class={classname} />);
  }

  // renderHeading(text, headingTagName, colClass) {
  //   if (!text) return null;
  //   return (
  //     <div className={`banner-shelf-heading ${colClass || ''}`}>
  //       <Text tagName={headingTagName} content={text} />
  //     </div>
  //   );
  // }

  // renderBody(text, colClass) {
  //   if (!text) return null;
  //   return (
  //     <div className={`banner-shelf-body ${colClass | ''}`}>
  //       <Text content={text} format="richtext" />
  //     </div>
  //   );
  // }

  // renderCta(cta, colClass) {
  //   if (!cta) return null;
  //   return (
  //     <div className={`banner-shelf-cta ${colClass || ''}`}>
  //       <CtaLink variant="button" cta={cta} />
  //     </div>
  //   );
  // }

  render() {
    const { id, content, classNamePrefix, variant } = this.props;

    const metaVariant = content.meta_variant || variant || 'primary';
    const metaLayout = content.meta_layout || 'vertical_left';
    const alignment = metaLayout.split('_')[1];

    const headingTagName = (classNamePrefix === 'page-heading-shelf') ? 'h1' : 'h2';
    const panel = content.panel ? content.panel : content;
    const containerClass = content.width != "full" ? `shelf__container ${ShelfUtils.shelfContainerClass(content)}` : null;
    const classExtra = ImageUtils.isValid(panel.background_image) ? 'banner-shelf--imagebackground' : null;
    const background =  panel.attributes[0] ? panel.attributes[0].value : null;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group} layout={`align-${alignment}`} classExtra={classExtra}>
        <div className={containerClass}>
          <Banner 
            backgroundImage={background}
            heading={<Text tagName={headingTagName} content={panel.heading} />}
            body={<Text content={panel.body} format="richtext"/>}
            ctas={panel.ctas}
            layout={metaLayout}
            width={content.width}
          />
        </div>
      </Shelf>
    );
  }
}

BannerShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  id: PropTypes.string
}

CmsComponentRegistry.register('banner_shelf', BannerShelf, 'banner-shelf', 'banner');

export default BannerShelf;