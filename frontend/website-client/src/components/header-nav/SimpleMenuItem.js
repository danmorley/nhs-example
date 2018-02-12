import React, { Component } from 'react';

class SimpleMenuItem extends Component {
  
  render() {  
    let href = this.props.item.link_page || this.props.item.link_external;
    
    return (
      <li>
        <a href={href}>
          {this.props.item.value.link_text}
        </a>
      </li>
    );
  }
}

export default SimpleMenuItem;
