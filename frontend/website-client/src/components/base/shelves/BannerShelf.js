import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from './Shelf';
import Text from '../Text';
import Image from '../Image';
import CtaLink from '../shared/CtaLink';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './banner-shelf.css';
import ResponsiveBackgroundImage from '../shared/ResponsiveBackgroundImage';
import ShelfUtils from '../shared/ShelfUtils';

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

  renderHeading(text, headingTagName, colClass) {
    if (!text) return null;
    return (
      <div className={`banner-shelf-heading ${colClass || ''}`}>
        <Text tagName={headingTagName} content={text} />
      </div>
    );
  }

  renderBody(text, colClass) {
    if (!text) return null;
    return (
      <div className={`banner-shelf-body ${colClass | ''}`}>
        <Text content={text} format="richtext" />
      </div>
    );
  }

  renderCta(cta, colClass) {
    if (!cta) return null;
    return (
      <div className={`banner-shelf-cta ${colClass || ''}`}>
        <CtaLink variant="button" cta={cta} />
      </div>
    );
  }

  render() {
    const { id, content, classNamePrefix, variant, layout } = this.props;

    const metaVariant = content.meta_variant || variant;
    const metaLayout = content.meta_layout || layout || 'vertical_left';
    const [ direction, alignment ] = metaLayout.split('_');

    const headingTagName = (classNamePrefix === 'page-heading-shelf') ? 'h1' : 'h2';
    const panel = content.panel

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group} layout={`align-${alignment}`}>
        <ResponsiveBackgroundImage image={panel.background_image} className={`shelf__container ${ShelfUtils.shelfContainerClass(content)} child-image--${content.meta_image_display}`}>
          { direction === 'vertical' && [
            <div key="1" className="row">{this.renderHeading(panel.heading, headingTagName, 'col-12')}</div>,
            <div key="2" className="row">{this.renderBody(panel.body, 'col-12')}</div>,
            <div key="3" className="row">{this.renderCta(panel.cta, 'col-12')}</div>
          ]
          }
          { direction === 'horizontal' &&
            <div key="1" className="row align-items-center">
              <div className="col">
                {this.renderHeading(panel.heading, headingTagName)}
                {this.renderBody(panel.body)}
              </div>
              {this.renderCta(panel.cta, 'col')}
            </div>
          }
        </ResponsiveBackgroundImage>
      </Shelf>
    );
  }
}

BannerShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  layout: PropTypes.string,
  id: PropTypes.string
}

CmsComponentRegistry.register('banner_shelf', BannerShelf, 'banner-shelf', 'banner');

export default BannerShelf;
