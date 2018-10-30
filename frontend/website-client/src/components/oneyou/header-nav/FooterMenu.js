import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SimpleMenuItem from './SimpleMenuItem';
import './footer-menu.css';
import chunk from 'lodash.chunk';

class FooterMenu extends Component {
  render() {
    // Render simple menu items only.
    let { items, show_sitemap, heading, number_per_column } = this.props;

    if (show_sitemap){
      items = items.concat({
        value: {
          link_text: 'Sitemap',
          link_external: global.rootUrl +"/sitemap",
          link_page: {}
        },
        type: "simple_menu_item"
      });
    }

    if (items.length == 0) return null;

    return (
      <div className ="footer-nav">
        {heading && <h2>{heading}</h2>}
          {chunk(items, number_per_column).map((list, i) => {
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

FooterMenu.defaultProps = {
  items: [],
  number_per_column: 100
};

FooterMenu.propTypes = {
  items: PropTypes.array.isRequired,
  show_sitemap: PropTypes.bool.isRequired,
  heading: PropTypes.string,
  number_per_column: PropTypes.number.isRequired
}

export default FooterMenu;
