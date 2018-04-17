import React, { Component } from 'react';
import Shelf from './Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import SimpleMenuItem from '../header-nav/SimpleMenuItem';
import MultiMenuItem from '../header-nav/MultiMenuItem';

class SiteMapShelf extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    let topNav = this.props.site.menu;
    let footerNav = this.props.site.footer;

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

CmsComponentRegistry.register('sitemap_shelf', SiteMapShelf);

export default SiteMapShelf;
