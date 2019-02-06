import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CmsComponentRegistry from '../CmsComponentRegistry';

// Wildcard imports are not supported by Babel without babel-wildcard plugin.
// Create react app template app hides away Babel, plugin can not be added. You must import
// all inputs explicitly.
// With the plugin import statement is as follows
// import * as Panels from './panels'

import PlaceholderPanel from '../panels/PlaceholderPanel';
import '../panels/ImageTeaserPanel';
import '../panels/SimpleServiceFinder';
import '../panels/SimpleServiceFinderForm';

/*eslint-disable */
import AccordionPanel from '../panels/AccordionPanel';
import AppTeaserPanel from '../panels/AppTeaserPanel';
import BannerPanel from '../panels/BannerPanel';
import CtaPanel from '../panels/CtaPanel';
import IconCardPanel from '../panels/IconCardPanel';
import InformationPanel from '../panels/InformationPanel';
import InlineScriptPanel from '../panels/InlineScriptPanel';
import InlineSvgPanel from '../panels/InlineSvgPanel';
import ListItemPanel from '../panels/ListItemPanel';
import RichTextPanel from '../panels/RichTextPanel';
import SimpleImagePanel from '../panels/SimpleImagePanel';
import SimpleTextPanel from '../panels/SimpleTextPanel';
import VideoTeaserPanel from '../panels/VideoTeaserPanel';
import OneyouTeaserPanel from '../../oneyou/panels/OneyouTeaserPanel';
/*eslint-enable */

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
    // const ContainerTag = containerTagName;
    return MultiPanelBlock.renderItems(items, panelClass, containerTagName);
  }
}

MultiPanelBlock.defaultProps = {
  containerTagName: 'div'
};

MultiPanelBlock.propTypes = {
  items: PropTypes.array.isRequired,
  containerTagName: PropTypes.string,
  panelClass: PropTypes.object
}

export default MultiPanelBlock;
