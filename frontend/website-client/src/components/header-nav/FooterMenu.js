import React, { Component } from 'react';
import SimpleMenuItem from './SimpleMenuItem';
import { Link } from 'react-router-dom';
import styles from './footer-menu.css';

class FooterMenu extends Component {
  render() {
    if (!this.props.items) return null;
    // Render simple menu items only.
    
    let itemCol1 = [];
    let itemCol2 = [];
    
    this.props.items.map((item, i) => {
      if (item.type === 'simple_menu_item') {
        if (i <= 3) {
          itemCol1.push((<SimpleMenuItem key={i} item={item} classNamePrefix="footer" />));
        }  
        else {
          itemCol2.push ((<SimpleMenuItem key={i} item={item} classNamePrefix="footer" />));
        }
      } else {
        return null;
      }
    });

    return (
      <div className ="footer-nav">
        <ul className ="footer-nav__col-1">
          {itemCol1}
        </ul>
        <ul className ="footer-nav__col-2">
          {itemCol2}
          <li>
            <Link to={global.rootUrl +"/sitemap"} className="footer-nav__link">Sitemap</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default FooterMenu;
