import React, { Component } from 'react';
import SimpleMenuItem from './SimpleMenuItem';

class MultiMenuItem extends Component {

  render() {
    let children = this.props.item.value.menu_items.map(function (item) {
      if (item.type === 'simple_menu_item'){
        return (
          <SimpleMenuItem item={item} key={item.id} />
        );
      } else {
        return null;
      }
    });

    return (
      <li class="header-nav__item">
        <h3 class="header-nav__secondary-title header-nav__secondary-title--closed">
          {this.props.item.value.label}
        </h3>
        <ul class="header-nav__secondary-nav">
          {children}
        </ul>
      </li>
    );
  }
}

export default MultiMenuItem;
