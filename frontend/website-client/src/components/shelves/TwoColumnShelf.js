import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from '../shelves/Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './two-column-shelf.css';
import MultiPanelBlock from '../pages/blocks/MultiPanelBlock';


/**
 *  TwoColumnShelf is a shelf that can be used to display other
 *  components in two columns (on desktop). Content for each column
 *  is provided separately, and the second column will drop below
 *  the first on mobile.
 *
 *  {
 *    "column_1_heading": "750ml bottle of red, white or rose wine (ABV 13.5%)",
 *    "column_1_items": [],
 *    "column_2_heading": "Other drinks",
 *    "column_2_items": [],
 *    "meta_variant": "standard",
 *    "meta_image_display": "cover",
 *    "shelf_id": "",
 *  }
 */
class TwoColumnShelf extends Component {
  render() {
    let { id, content, classNamePrefix, variant } = this.props;
    let metaVariant = content.meta_variant || variant;
    let metaImageDisplay = content.meta_image_display;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant}>
        <div className={`shelf__container container image--${metaImageDisplay}`}>
          <div className="row">
            {content.column_1_heading &&
              <div className="col-12 col-sm-6 order-1 no-gutters">
                <div className="row align-items-end">
                  <h2 className="col shelf__header">{content.column_1_heading}</h2>
                </div>
              </div>
            }
            <div className="col-12 col-sm-6 order-2 order-sm-3">
              <MultiPanelBlock items={content.column_1_items}/>
            </div>
            {content.column_2_heading &&
              <div className="col-12 col-sm-6 order-3 order-sm-2">
                <div className="row align-items-end h-100">
                  <h2 className="col shelf__header">{content.column_2_heading}</h2>
                </div>
              </div>
            }
            <div className="col-12 col-sm-6 order-4">
              <MultiPanelBlock items={content.column_2_items}/>
            </div>
          </div>
        </div>
      </Shelf>
    );
  }
}

TwoColumnShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  layout: PropTypes.string,
  variant: PropTypes.string,
  id: PropTypes.string
};

CmsComponentRegistry.register('two_column_shelf', TwoColumnShelf, 'two-column-shelf');

export default TwoColumnShelf;
