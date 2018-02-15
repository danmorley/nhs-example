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
      <li>
        {this.props.item.value.label}
        <ul>
          {children}
        </ul>
      </li>
    );
  }
}

export default MultiMenuItem;
