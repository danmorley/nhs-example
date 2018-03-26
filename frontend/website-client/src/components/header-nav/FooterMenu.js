import React, { Component } from 'react';
import SimpleMenuItem from './SimpleMenuItem';
import { Link } from 'react-router-dom';
import styles from './footer-menu.css';

class FooterMenu extends Component {
  render() {
    if (!this.props.items) return null;

    // Render simple menu items only.
    let items = this.props.items.map((item, i) => {
      if (item.type === 'simple_menu_item') {
        return (<SimpleMenuItem key={i} item={item} classNamePrefix="footer" />);
      } else {
        return null;
      }
    });

    return (
      <ul className ="footer-nav__items">
        {items}
        <li>
          <Link to={global.rootUrl +"/sitemap"} className="footer-nav__link">Sitemap</Link>
        </li>
      </ul>
    );
  }
}

export default FooterMenu;
