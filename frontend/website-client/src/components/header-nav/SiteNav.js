import React, { Component } from 'react';
import SimpleMenuItem from './SimpleMenuItem';
import MultiMenuItem from './MultiMenuItem';
import styles from './header-nav.css';

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
      <nav className="header-nav">
        <h2 className="header-nav__title">
          MENU
        </h2>
        <ul className="header-nav__items">
          <li className="header-nav__item">
              <a href="#" className="header-nav__link header-nav__link--home">HOME</a>
          </li>
          {items}
        </ul>
      </nav>
    );
  }
}

export default SiteNav;
