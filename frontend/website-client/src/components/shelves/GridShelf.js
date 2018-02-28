import React, { Component } from 'react';
import Shelf from '../shelves/Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';

import sampleBgImage from './healthcheckup.png'; // Tell Webpack this JS file uses this image
// import testImage from '../../assets/images/Trump2.jpg';

import PlaceholderPanel from '../panels/PlaceholderPanel';
import VideoTeaserPanel from '../panels/VideoTeaserPanel';
import Oneyou1TeaserPanel from '../panels/Oneyou1TeaserPanel';

/**
 *  Grid Shelf is a simple shelf that can be used to display other
 *  components in a grid.
 *
 *  It expects the following properties:
 */
class GridShelf extends Component {
  render() {
    let { content, classNamePrefix } = this.props;
    // let metaLayout = content.meta_layout || '';

    var panels = content.items.map((panel, i) => {
      const panelInfo = CmsComponentRegistry.components[panel.type];
      const PanelClass = panelInfo && panelInfo.class;
      const panelClassNamePrefix = panelInfo && panelInfo.classNamePrefix;
      const panelId = panel.panel_id || panel.id;
      if (PanelClass) {
        return (<div key={i} className="shelf__col col-sm-12 col-md-6"><PanelClass content={panel.value} id={panelId} classNamePrefix={panelClassNamePrefix}/></div>);
      } else {
        return (<div key={i} className="shelf__col col-sm-12 col-md-6"><PlaceholderPanel panelType={panel.type} id={panelId} classNamePrefix={panelClassNamePrefix}/></div>);
      }
    });

    let backgroundImageShelfStyle = {
      backgroundImage: 'url(' + sampleBgImage + ')',
    };

    let backgroundColourShelfStyle = {
    };

    let shelfStyle = (content.background_image) ? backgroundImageShelfStyle : backgroundColourShelfStyle;

    return (
      <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix}>
        <div className="shelf__container container" style={shelfStyle}>
          <h2 className="shelf__header">{content.heading}</h2>
          <div className="row">
            {panels}
          </div>
        </div>
      </Shelf>
    );
  }
}

CmsComponentRegistry.register('grid_shelf', GridShelf, 'basic-grid-shelf');

export default GridShelf;
