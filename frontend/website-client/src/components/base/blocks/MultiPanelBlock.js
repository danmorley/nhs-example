import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CmsComponentRegistry from '../CmsComponentRegistry';

// Wildcard imports are not supported by Babel without babel-wildcard plugin.
// Create react app template app hides away Babel, plugin can not be added. You must import
// all inputs explicitly.
// With the plugin import statement is as follows
// import * as Panels from './panels'
import PlaceholderPanel from '../../oneyou/panels/PlaceholderPanel';
import VideoTeaserPanel from '../../oneyou/panels/VideoTeaserPanel';
import '../../oneyou/panels/ImageTeaserPanel';
import '../panels/ImageTeaserPanel/ImageTeaserPanel';
import Oneyou1TeaserPanel from '../../oneyou/panels/Oneyou1TeaserPanel';
import AppTeaserPanel from '../../oneyou/panels/AppTeaserPanel';
import InformationPanel from '../../oneyou/panels/InformationPanel';
import SimpleTextPanel from '../../oneyou/panels/SimpleTextPanel';
import RichTextPanel from '../../oneyou/panels/RichTextPanel';
import IconCardPanel from '../../oneyou/panels/IconCardPanel';
import InlineScriptPanel from '../../oneyou/panels/InlineScriptPanel';
import InlineSvgPanel from '../../oneyou/panels/InlineSvgPanel';
import CtaPanel from '../../oneyou/panels/CtaPanel';
import ListItemPanel from '../../oneyou/panels/ListItemPanel';
import SimpleImagePanel from '../../oneyou/panels/SimpleImagePanel';
import AccordionPanel from '../../oneyou/panels/AccordionPanel';

class MultiPanelBlock extends Component {
  static renderItems(items, panelClass, containerTag) {
    console.log('renderItems: rendering items');
    const ContainerTag = containerTag;

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

  render() {
    console.log('rendering MultiPanelBlock');
    const { items, panelClass, containerTagName } = this.props;
    const ContainerTag = containerTagName;
    return MultiPanelBlock.renderItems(items, panelClass, containerTagName);
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
