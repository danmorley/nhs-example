import React, { Component } from 'react';
import SimpleMenuItem from './SimpleMenuItem';

class MultiMenuItem extends Component {

  render() {
    let children = this.props.item.value.menu_items.map(function (item) {
      if (item.type === 'simple_menu_item'){
        return (
          <SimpleMenuItem item={item} key={item.id} menuType ="header" />
        );
      } else {
        return null;
      }
    });

    return (
      <li className="header-nav__item">
        <span className="header-nav__secondary-title"
          onClick={this.handleClick.bind(this)}>
          {this.props.item.value.label}
        </span>
        <ul className="header-nav__secondary-nav">
          {children}
        </ul>
      </li>
    );
  }
  
  handleClick(e) {
    e.target.classList.toggle('header-nav__secondary-title--open');
  }
}

export default MultiMenuItem;
