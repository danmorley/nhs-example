import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from './Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import SimpleMenuItem from '../header-nav/SimpleMenuItem';
import MultiMenuItem from '../header-nav/MultiMenuItem';

class SiteMapShelf extends Component {
  render() {
    let topNav = this.props.content.menu;
    let footerNav = this.props.content.footer;

    let topNavItems = topNav.items.map((item, i) => {
      if (item.type === 'simple_menu_item'){
        return (<SimpleMenuItem key={i} item={item} classNamePrefix="sitemap" />);
      }
      else if (item.type === 'multi_menu_item'){
        return (<MultiMenuItem key={i} item={item} classNamePrefix="sitemap" />);
      }
      else {
        return null;
      }
    });

    let footerNavItems = footerNav.items.map((item, i) => {
      if (item.type === 'simple_menu_item') {
        return (<SimpleMenuItem key={i} item={item} classNamePrefix="sitemap" />);
      } else {
        return null;
      }
    });

    return (
      <Shelf classNamePrefix="sitemap">
        <div className="shelf__container container">
          <div className="row">
            <div className="col">
              <ul className="no-top-margin">
                {topNavItems}
                {footerNavItems}
              </ul>
            </div>
          </div>
        </div>
      </Shelf>
    );
  }
}

SiteMapShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired
};

CmsComponentRegistry.register('sitemap_shelf', SiteMapShelf);

export default SiteMapShelf;
