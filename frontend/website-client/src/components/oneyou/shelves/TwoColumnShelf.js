import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from '../../base/shelves/Shelf';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import './two-column-shelf.css';
import MultiPanelBlock from '../../base/blocks/MultiPanelBlock';


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

  colWidthForPercent(p){
    if(p === '25') return '3';
    if(p === '33') return '4';
    if(p === '67') return '8';
    if(p === '75') return '9';
    return '6';
  }

  render() {
    
    let { id, content, classNamePrefix, variant, layout } = this.props;
    let metaVariant = content.meta_variant || variant;
    let metaLayout = content.meta_layout || layout;
    let metaImageDisplay = content.meta_image_display;
    const [col1Percent, col2Percent] = metaLayout.split("_");

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} classExtra="with-padding">
        <div className={`shelf__container container image--${metaImageDisplay}`}>
          <div className="row no-gutters\">
            {content.column_1_heading &&
              <div className={`column column1-heading col-12 col-md-${this.colWidthForPercent(col1Percent)} order-1 no-gutters`}>
                <div className="row align-items-end">
                  <h2 className="col shelf__header">{content.column_1_heading}</h2>
                </div>
              </div>
            }
            <div className={`column column1 col-12 col-md-${this.colWidthForPercent(col1Percent)} order-2 order-md-3`}>
              <MultiPanelBlock items={content.column_1_items}/>
            </div>
            {content.column_2_heading &&
              <div className={`column column2-heading col-12 col-md-${this.colWidthForPercent(col2Percent)} order-3 order-md-2`}>
                <div className="row align-items-end h-100">
                  <h2 className="col shelf__header">{content.column_2_heading}</h2>
                </div>
              </div>
            }
            <div className={`column column2 col-12 col-md-${this.colWidthForPercent(col2Percent)} order-4`}>
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

CmsComponentRegistry.register('two_column_shelf', TwoColumnShelf, 'two-column-shelf', null, '50_50');
CmsComponentRegistry.register('two_column_shelf_oneyou', TwoColumnShelf, 'two-column-shelf', null, '50_50');

export default TwoColumnShelf;
