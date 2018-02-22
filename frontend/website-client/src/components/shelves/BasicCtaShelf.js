import React, { Component } from 'react';
import Shelf from './Shelf';
import Text from '../Text';
import CtaLink from '../CtaLink';
import ShelfRegistry from './ShelfRegistry';

import sampleBgImage from './healthcheckup.png'; // Tell Webpack this JS file uses this image

/**
 *  Basic CTA Shelf is a simple shelf that can be used to display content
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
 *    shelf_id: "learn-more-shelf"
 *  }
 */
class BasicCtaShelf extends Component {
  render() {
    let { content } = this.props;
    let metaLayout = content.meta_layout || 'image_on_right';

    let backgroundImageShelfStyle = {
      backgroundImage: 'url(' + sampleBgImage + ')',
      backgroundSize: 'cover',
      backgroundPositionX: '50%',
      padding: '2em'
    };

    let backgroundColourShelfStyle = {
      backgroundColor: 'blue',
      padding: '2em'
    };

    let textPanel = (
      <div className="col-sm-6">
        <Text tagName="h2" content={content.heading} />
        <Text content={content.body} />
        <CtaLink link={content.cta_button_link}>{content.cta_button_label}</CtaLink>
      </div>
    );

    let shelfStyle = (content.background_image) ? backgroundImageShelfStyle : backgroundColourShelfStyle;

    let imagePanel = (
      <div className="col-sm-6">
        <img alt="roger"/>
      </div>
    );

    if (metaLayout === 'image_on_left') {
      return (
        <Shelf id={content.shelf_id || this.props.id} style={shelfStyle} classNamePrefix="promo">
          {imagePanel}{textPanel}
        </Shelf>
      );
    } else {
      return (
        <Shelf id={content.shelf_id || this.props.id} style={shelfStyle} classNamePrefix="promo" variant={content.meta_variant}>
          {textPanel}{imagePanel}
        </Shelf>
      );
    }
  }
}

ShelfRegistry.register(BasicCtaShelf, 'basic_cta_shelf');
ShelfRegistry.register(BasicCtaShelf, 'promo_shelf');

export default BasicCtaShelf;
