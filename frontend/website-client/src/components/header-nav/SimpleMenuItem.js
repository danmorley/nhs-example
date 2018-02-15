import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SimpleMenuItem extends Component {

  render() {
    let { link_path, link_external, link_text } = this.props.item.value;
    return (
      <li>
        <Link to={link_path || link_external}>{link_text}</Link>
      </li>
    );
  }
}

export default SimpleMenuItem;
