import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorBoundary from '../../ErrorBoundary';
import CmsComponentRegistry from '../../CmsComponentRegistry';

// Wildcard imports are not supported by Babel without babel-wildcard plugin.
// Create react app template app hides away Babel, plugin can not be added. You must import
// all inputs explicitly.
// With the plugin import statement is as follows
// import * as Shelves from './shelves'
import PlaceholderShelf from '../../shelves/PlaceholderShelf';
import GeneralTextShelf from '../../shelves/GeneralTextShelf';
import BasicCtaShelf from '../../shelves/BasicCtaShelf';
import PageHeadingShelf from '../../shelves/PageHeadingShelf';
import GuidanceShelf from '../../shelves/GuidanceShelf';
import MainCarouselShelf from '../../shelves/MainCarouselShelf';
import PanelCarouselShelf from '../../shelves/PanelCarouselShelf';
import GridShelf from '../../shelves/GridShelf';
import HeadingBodyShelf from '../../shelves/HeadingBodyShelf';
import NoticeShelf from '../../shelves/NoticeShelf';
import IframeShelf from '../../shelves/IframeShelf';
import ScriptShelf from '../../shelves/ScriptShelf';
import SiteMapShelf from '../../shelves/SiteMapShelf';
import DividerShelf from '../../shelves/DividerShelf';
import ArticlePageHeadingShelf from '../../shelves/ArticlePageHeadingShelf';
import RecipeGridShelf from '../../shelves/RecipeGridShelf';
import ShareButtonShelf from '../../shelves/ShareButtonShelf';
import TableShelf from '../../shelves/TableShelf';
import ActionPlanShelf from '../../shelves/ActionPlanShelf';
import ActionPlanDisplayShelf from '../../shelves/ActionPlanDisplayShelf';

class MultiShelfBlock extends Component {
  render() {
    let { body } = this.props;

    var shelves = body.map((shelf, _i) => {
      const shelfInfo = CmsComponentRegistry.components[shelf.type];
      const ShelfClass = shelfInfo && shelfInfo.class;
      const shelfClassNamePrefix = shelfInfo && shelfInfo.classNamePrefix;
      const shelfVariant = shelfInfo && shelfInfo.variant;
      const shelfLayout = shelfInfo && shelfInfo.layout;
      const shelfId = shelf.value.field_id || shelf.value.shelf_id || 'shelf-' + shelf.id;

      if (ShelfClass) {
        return (<ErrorBoundary key={shelf.id}><ShelfClass content={shelf.value} id={shelfId} classNamePrefix={shelfClassNamePrefix} variant={shelfVariant} layout={shelfLayout}/></ErrorBoundary>);
      } else {
        return (<PlaceholderShelf key={shelf.id} shelfType={shelf.type} id={shelfId} classNamePrefix={shelfClassNamePrefix}/>);
      }
    });

    return shelves;
  }
}

MultiShelfBlock.propTypes = {
  body: PropTypes.object.isRequired
}

export default MultiShelfBlock;
