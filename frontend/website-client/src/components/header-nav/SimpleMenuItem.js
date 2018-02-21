import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SimpleMenuItem extends Component {

  render() {
    let { link_path, link_external, link_text } = this.props.item.value;
  
    return (
      <li className = {this.props.classNamePrefix+"-nav__item"}>
        <Link to={link_path || link_external}  className = {this.props.classNamePrefix+"-nav__link"}>{link_text}</Link>
      </li>
    );
  }
}

export default SimpleMenuItem;
