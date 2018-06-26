import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from '../shelves/Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import Text from '../Text';
import './grid-shelf.css';
import ShowMorePanel from '../shared/ShowMorePanel';
import MultiPanelBlock from '../pages/blocks/MultiPanelBlock';
import ResponsiveBackgroundImage from '../shared/ResponsiveBackgroundImage';
import ImageUtils from '../panels/ImageUtils';

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
    let gridHeading = content.heading || '';
    let gridBody = content.body || '';

    const panelClass = ((metaLayout) => {
      switch(metaLayout) {
      case 'full_width':
        return 'shelf__col col-sm-12';
      case '2_col_1_on_mobile':
        return 'shelf__col col-sm-12 col-md-6';
      case '3_col_1_on_mobile':
        return'shelf__col col-sm-12 col-md-4';
      default:
        return 'shelf__col col-sm-12';
      }
    })(metaLayout);
    
    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant}>
        <ResponsiveBackgroundImage image={content.background_image} className={`shelf__container container-fluid child-image--${content.meta_image_display}`}>
          <div className="container">
            {gridHeading != '' &&
              <Text tagName="h2" content={gridHeading} className="shelf__header" />
            }
            {gridBody != '' &&
              <Text tagName="div" content={gridBody} className="shelf__body" format="richtext"/>
            }
            <div className="grid-container">
              <ShowMorePanel rowsToShow={content.rows_to_show}>
                <MultiPanelBlock items={content.items} panelClass={panelClass}/>
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

CmsComponentRegistry.register('grid_shelf', GridShelf, 'basic-grid-shelf', null, 'responsive_2_col');

export default GridShelf;
