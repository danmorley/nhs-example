import React, { Component } from 'react';
import SimpleMenuItem from './SimpleMenuItem';
import MultiMenuItem from './MultiMenuItem';
import styles from './header-nav.css';

class SiteNav extends Component {

  render() {
    if (!this.props.navItems) return null;

    let items = this.props.navItems.map((item, i) => {
      if (item.type === 'simple_menu_item'){
        return (<SimpleMenuItem key={i} item={item} classNamePrefix="header" />);
      }
      else if (item.type === 'multi_menu_item'){
        return (<MultiMenuItem key={i} item={item} classNamePrefix="header" />);
      }
      else {
        return null;
      }
    });

    return (
      <nav className="header-nav">
        <h2 className="header-nav__title">
          MENU
        </h2>
        <ul className="header-nav__items">
          {items}
        </ul>
      </nav>
    );
  }
}

export default SiteNav;
