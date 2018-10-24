import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from '../../../base/shelves/Shelf';
import Text from '../../../base/Text';
import CmsComponentRegistry from '../../../base/CmsComponentRegistry';
import './simple-richtext-shelf.css';

/**
 *  Simple Rich Text Shelf is a simple shelf that can be used to display rich text body content.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *  - variant - a default variant to use
 *  - layout - a default layout to use
 *
 *  content: {
 *    body: "Some body text",
 *  }
 */
class SimpleRichTextShelf extends Component {
  render() {
    let { id, content, classNamePrefix, variant } = this.props;
    let metaVariant = content.meta_variant || variant;
    // let metaLayout = content.meta_layout || layout;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
        <div className="shelf__container container">
          <div className="row">
            <div className="col shelf__col">
              <Text tagName="div" content={content.body} format="richtext"/>
            </div>
          </div>
        </div>
      </Shelf>
    );
  }
}

SimpleRichTextShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  layout: PropTypes.string,
  id: PropTypes.string
}

CmsComponentRegistry.register('simple_richtext_shelf', SimpleRichTextShelf, 'section-richtext-shelf');

export default SimpleRichTextShelf;
