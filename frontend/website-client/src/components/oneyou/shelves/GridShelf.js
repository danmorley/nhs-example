import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from '../../base/shelves/Shelf';
// import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import Text from '../../base/Text';
import './grid-shelf.css';
import ShowMorePanel from '../shared/ShowMorePanel';
import MultiPanelBlock from '../../base/blocks/MultiPanelBlock';
import ResponsiveBackgroundImage from '../shared/ResponsiveBackgroundImage';

/**
 *  Grid Shelf is a simple shelf that can be used to display other
 *  components in a grid.
 *
 *  It expects the following Layouts:
 *
 *  responsive_2_col
 *  full_width
 */
class GridShelf extends Component {
  render() {
    let { id, content, classNamePrefix, layout, variant } = this.props;
    let metaVariant = content.meta_variant || variant;
    let metaLayout = content.meta_layout || layout;
    let gutterSize = content.meta_gutter_size || 'gutter-unset';
    let gridHeading = content.heading || '';
    let gridBody = content.body || '';

    const panelClass = ((metaLayout) => {
      switch(metaLayout) {
      case 'full_width':
      case 'article_full_width':
        return 'shelf__col col-sm-12';
      case '2_col_1_on_mobile':
        return 'shelf__col col-sm-12 col-md-6';
      case '3_col_1_on_mobile':
        return 'shelf__col col-sm-12 col-md-4';
      case '4_col_1_on_mobile':
        return 'shelf__col col-sm-12 col-md-3';
      case '4_col_2_on_mobile':
        return 'shelf__col col-6 col-md-3';
      case '4_col_2_tablet_1_on_mobile':
        return 'shelf__col col-sm-12 col-md-6 col-lg-3';
      default:
        return 'shelf__col col-sm-12';
      }
    })(metaLayout);

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} layout={metaLayout} trackingGroup={content.tracking_group}>
        <ResponsiveBackgroundImage image={content.background_image} className={`shelf__container container-fluid child-image--${content.meta_image_display}`}>
          <div className="container">
            {gridHeading != '' &&
              <Text tagName="h2" content={gridHeading} className="shelf__header" />
            }
            {gridBody != '' &&
              <Text tagName="div" content={gridBody} className="shelf__body" format="richtext"/>
            }
            <div className="grid-container">
              <ShowMorePanel rowsToShow={content.rows_to_show} id={`${id}`}>
                { MultiPanelBlock.renderItems(content.items, `${panelClass} ${gutterSize}`, 'div') }
              </ShowMorePanel>
            </div>
          </div>
        </ResponsiveBackgroundImage>
      </Shelf>
    );
  }
}

GridShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  layout: PropTypes.string,
  variant: PropTypes.string,
  id: PropTypes.string
};

// CmsComponentRegistry.register('grid_shelf', GridShelf, 'basic-grid-shelf', null, 'responsive_2_col', 'oneyou');

export default GridShelf;
