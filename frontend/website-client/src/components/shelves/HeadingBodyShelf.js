import React, { Component } from 'react';
import Shelf from './Shelf';
import Text from '../Text';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './promo-shelf.css';

/**
 *  Heading and Body Shelf is a simple shelf that can be used to display generic
 *  content in the form of a heading and rich text body.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *  - variant - a default variant to use
 *  - layout - a default layout to use
 *
 *  content: {
 *    heading: "Learn More",
 *    body: "Some body text",
 *    field_id: "sample-shelf-1"
 *  }
 */
class HeadingBodyShelf extends Component {
  render() {
    let { id, content, classNamePrefix, variant, layout } = this.props;
    let metaVariant = content.meta_variant || variant;
    let metaLayout = content.meta_layout || layout;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant}>
        <div className="shelf__container container">
          <div className="row">
            <div className="col shelf__col">
              <Text tagName="h2" content={content.heading} />
              <Text tagName="div" content={content.body} format="richtext"/>
            </div>
          </div>
        </div>
      </Shelf>
    );
  }
}

//
// Section Heading Shelf
//
// Layouts: full_width
// Variants: none
CmsComponentRegistry.register('section_heading_shelf', HeadingBodyShelf, 'section-heading-shelf');

export default HeadingBodyShelf;
