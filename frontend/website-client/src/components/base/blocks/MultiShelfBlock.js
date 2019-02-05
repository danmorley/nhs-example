import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorBoundary from '../ErrorBoundary';
import CmsComponentRegistry from '../CmsComponentRegistry';

import PlaceholderShelf from '../shelves/PlaceholderShelf';

/*eslint-disable */
import ActionPlanDisplayShelf from '../../oneyou/shelves/ActionPlanDisplayShelf';
import ActionPlanShelf from '../../oneyou/shelves/ActionPlanShelf';
import BannerShelf from '../shelves/BannerShelf';
import CarouselShelf from '../shelves/CarouselShelf';
import DividerShelf from '../shelves/DividerShelf';
import GridShelf from '../shelves/GridShelf';
import HeadingBodyShelf from '../shelves/HeadingBodyShelf';
import IframeShelf from '../shelves/IframeShelf';
import PageHeadingShelf from '../shelves/PageHeadingShelf';
import ScriptShelf from '../shelves/ScriptShelf';
import SexhealthPageHeadingShelf from '../../sexhealth/shelves/SexhealthPageHeadingShelf';
import SexhealthPageHeadingWithVideoShelf from '../../sexhealth/shelves/SexhealthPageHeadingWithVideoShelf';
import SimplePageHeadingShelf from '../shelves/SimplePageHeadingShelf/SimplePageHeadingShelf';
import SimpleRichTextShelf from '../shelves/SimpleRichTextShelf/SimpleRichTextShelf';
import SvgShelf from '../shelves/SvgShelf';
import TwoColumnShelf from '../shelves/TwoColumnShelf';
/*eslint-enable */


class MultiShelfBlock extends Component {
  render() {
    const { body, context } = this.props;

    var shelves = body.map((shelf, _i) => {
      const shelfInfo = CmsComponentRegistry.components[shelf.type];
      const ShelfClass = shelfInfo && shelfInfo.class;
      const shelfClassNamePrefix = shelfInfo && shelfInfo.classNamePrefix;
      const shelfVariant = shelfInfo && shelfInfo.variant;
      const shelfLayout = shelfInfo && shelfInfo.layout;
      const shelfId = shelf.value.field_id || shelf.value.shelf_id || 'shelf-' + shelf.id;

      if (ShelfClass) {
        return (<ErrorBoundary key={shelf.id}><ShelfClass content={shelf.value} id={shelfId} classNamePrefix={shelfClassNamePrefix} variant={shelfVariant} layout={shelfLayout} context={context}/></ErrorBoundary>);
      } else {
        return (<PlaceholderShelf key={shelf.id} shelfType={shelf.type} id={shelfId} classNamePrefix={shelfClassNamePrefix}/>);
      }
    });

    return shelves;
  }
}

MultiShelfBlock.propTypes = {
  body: PropTypes.array.isRequired,
  context: PropTypes.object.isRequired
}

export default MultiShelfBlock;
