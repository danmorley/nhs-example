import React, { Component } from 'react';
import Shelf from './Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import Text from '../Text';

class SiteMapShelf extends Component {


  render() {
    let { id, content, classNamePrefix, variant, layout } = this.props;
    return (
      
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant}>
        <div className="shelf__container container" style={shelfStyle}>
          <div className="row">
            Sitemap
          </div>
        </div>
      </Shelf>
    );
  }
}

CmsComponentRegistry.register('sitemap_shelf', SiteMapShelf);

export default SiteMapShelf;