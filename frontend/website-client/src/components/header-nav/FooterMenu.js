import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SimpleMenuItem from './SimpleMenuItem';
import { Link } from 'react-router-dom';
import './footer-menu.css';
import chunk from 'lodash.chunk';

class FooterMenu extends Component {
  render() {
    if (!this.props.items) return null;
    // Render simple menu items only.
    
    const siteMapLink = {
      value: { 
        link_text: 'Sitemap',
        link_external: global.rootUrl +"/sitemap", 
        link_page: {} 
      },
      type: "simple_menu_item"
    }

    let items = this.props.items.concat(siteMapLink);

    return (
      <div className ="footer-nav">
        {chunk(items, 4).map((list, i) => {
          return <ul key={i} className={`footer-nav__col-${i+1}`}>
            {list.map((item, j) => {
              return <SimpleMenuItem key={j} item={item} classNamePrefix="footer" />;
            })}
          </ul>
        })}      
      </div>
    );
  }
}

FooterMenu.propTypes = {
  items: PropTypes.object.isRequired
}

export default FooterMenu;
