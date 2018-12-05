import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SimpleMenuItem from './SimpleMenuItem';
import MultiMenuItem from './MultiMenuItem';
import './header-nav.css';

class SiteNav extends Component {
  
  onNavCloseClick() {
    this.props.navCloseWasClicked();
  }

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
      <nav className="header-nav" role="navigation">
        <div className="header-nav__close" aria-label="Close navigation" onClick={this.onNavCloseClick.bind(this)}>x</div>
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

SiteNav.propTypes = {
  navItems: PropTypes.array.isRequired,
  navCloseWasClicked: PropTypes.func
};

export default SiteNav;