import React, { Component } from 'react';
import SimpleMenuItem from './SimpleMenuItem';
import MultiMenuItem from './MultiMenuItem';

class SiteNav extends Component {

  render() {
    if (!this.props.navItems) return null;

    let items = this.props.navItems.map((item, i) => {
      if (item.type === 'simple_menu_item'){
        return (<SimpleMenuItem key={i} item={item} />);
      }
      else if (item.type === 'multi_menu_item'){
        return (<MultiMenuItem key={i} item={item} />);
      }
      else {
        return null;
      }
    });

    return (
      <nav>
        <ul>
          {items}
        </ul>
      </nav>
    );
  }
}

export default SiteNav;
