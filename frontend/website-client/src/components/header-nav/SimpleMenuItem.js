import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SimpleMenuItem extends Component {

  render() {
    let { link_path, link_external, link_text } = this.props.item.value;
    return (
      <li className ="header-nav__item">
        <Link to={link_path || link_external}  className ="header-nav__link">{link_text}</Link>
          {this.props.item.value.link_text}
      </li>
    );
  }
}

export default SimpleMenuItem;
