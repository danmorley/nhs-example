import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from '../shelves/Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './grid-shelf.css';
import ShowMorePanel from '../shared/ShowMorePanel';

import PlaceholderPanel from '../panels/PlaceholderPanel';
import VideoTeaserPanel from '../panels/VideoTeaserPanel';
import ImageTeaserPanel from '../panels/ImageTeaserPanel';
import Oneyou1TeaserPanel from '../panels/Oneyou1TeaserPanel';
import AppTeaserPanel from '../panels/AppTeaserPanel';
import InformationPanel from '../panels/InformationPanel';

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
    let metaLayout = content.meta_layout || layout;

    const panelClass = ((metaLayout) => {
      switch(metaLayout) {
        case 'full_width':
          return 'shelf__col col-sm-12';
        case '2_col_1_on_mobile':
          return 'shelf__col col-sm-12 col-md-6';
        case '3_col_1_on_mobile':
          return'shelf__col col-sm-12 col-md-4';;
        default:
          return 'shelf__col col-sm-12';
    }})(metaLayout);
    
    var panels = content.items.map((panel, i) => {
      const panelInfo = CmsComponentRegistry.components[panel.type];
      const PanelClass = panelInfo && panelInfo.class;
      const panelClassNamePrefix = panelInfo && panelInfo.classNamePrefix;
      const panelId = panel.value.field_id || panel.id;
      if (PanelClass) {
        return (<div key={i} className={panelClass}><PanelClass content={panel.value} id={panelId} classNamePrefix={panelClassNamePrefix}/></div>);
      } else {
        return (<div key={i} className={panelClass}><PlaceholderPanel panelType={panel.type} id={panelId} classNamePrefix={panelClassNamePrefix}/></div>);
      }
    });

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix}>
        <div className="shelf__container container">
          <h2 className="shelf__header">{content.heading}</h2>
          <ShowMorePanel rowsToShow={content.rows_to_show}>
            {panels}
          </ShowMorePanel>
        </div>
      </Shelf>
    );
  }
}

GridShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  layout: PropTypes.string,
  variant: PropTypes.string
};

CmsComponentRegistry.register('grid_shelf', GridShelf, 'basic-grid-shelf', null, 'responsive_2_col');

export default GridShelf;
