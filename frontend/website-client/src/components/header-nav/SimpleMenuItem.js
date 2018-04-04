import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SimpleMenuItem extends Component {

  render() {
    let { link_page, link_external, link_text } = this.props.item.value;
  
    return (
      <li className = {this.props.classNamePrefix+"-nav__item"}>
        <div className= {this.props.classNamePrefix+"-nav__separator"}>
          <Link to={link_page.relative_path || link_external}  className = {this.props.classNamePrefix+"-nav__link"}>{link_text}</Link>
        </div>
      </li>
    );
  }
}

export default SimpleMenuItem;
