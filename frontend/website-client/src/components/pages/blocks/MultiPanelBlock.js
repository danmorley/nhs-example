import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CmsComponentRegistry from '../../CmsComponentRegistry';

// Wildcard imports are not supported by Babel without babel-wildcard plugin.
// Create react app template app hides away Babel, plugin can not be added. You must import
// all inputs explicitly.
// With the plugin import statement is as follows
// import * as Panels from './panels'
import PlaceholderPanel from '../../panels/PlaceholderPanel';
import VideoTeaserPanel from '../../panels/VideoTeaserPanel';
import ImageTeaserPanel from '../../panels/ImageTeaserPanel';
import Oneyou1TeaserPanel from '../../panels/Oneyou1TeaserPanel';
import AppTeaserPanel from '../../panels/AppTeaserPanel';
import InformationPanel from '../../panels/InformationPanel';
import SimpleTextPanel from '../../panels/SimpleTextPanel';
import IconCardPanel from '../../panels/IconCardPanel';

class MultiPanelBlock extends Component {
  render() {
    const { items, panelClass, containerTagName } = this.props;
    const ContainerTag = containerTagName;

    var panels = items.map((panel, i) => {
      const panelInfo = CmsComponentRegistry.components[panel.type];
      const PanelClass = panelInfo && panelInfo.class;
      const panelClassNamePrefix = panelInfo && panelInfo.classNamePrefix;
      const panelVariant = panelInfo && panelInfo.variant;
      const panelLayout = panelInfo && panelInfo.layout;
      const panelId = panel.value.field_id || panel.value.panel_id || panel.value.shelf_id || 'panel-' + panel.id;
      const itemPanelClass = `${panelClass} panel-item-${i}`;

      if (PanelClass) {
        return (<ContainerTag key={panel.id} className={itemPanelClass}><PanelClass content={panel.value} id={panelId} classNamePrefix={panelClassNamePrefix} variant={panelVariant} layout={panelLayout}/></ContainerTag>);
      } else {
        return (<ContainerTag key={panel.id} className={panelClass}><PlaceholderPanel panelType={panel.type} id={panelId} classNamePrefix={panelClassNamePrefix}/></ContainerTag>);
      }
    });

    return panels;
  }
}

MultiPanelBlock.defaultProps = {
  containerTagName: 'div'
};

MultiPanelBlock.propTypes = {
  items: PropTypes.object.isRequired,
  containerTagName: PropTypes.string,
  panelClass: PropTypes.object
}

export default MultiPanelBlock;
