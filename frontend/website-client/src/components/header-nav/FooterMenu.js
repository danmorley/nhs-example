import React, { Component } from 'react';
import SimpleMenuItem from './SimpleMenuItem';

class FooterMenu extends Component {
  render() {
    if (!this.props.items) return null;

    // Render simple menu items only.
    let items = this.props.items.map((item, i) => {
      if (item.type === 'simple_menu_item'){
        return (<SimpleMenuItem key={i} item={item} />);
      } else {
        return null;
      }
    });

    return (
        <ul>
          {items}
        </ul>
    );
  }
}

export default FooterMenu;
