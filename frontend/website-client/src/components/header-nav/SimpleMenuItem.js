import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

class SimpleMenuItem extends Component {
  render() {
    let { link_page, link_external, link_text } = this.props.item.value;

    return (
      <li className = {this.props.classNamePrefix+"-nav__item"}>
        <div className= {this.props.classNamePrefix+"-nav__separator"}>
          <Link onClick={this.handleClick} to={link_page.relative_path || link_external}  className = {this.props.classNamePrefix+"-nav__link"}>{link_text}</Link>
        </div>
      </li>
    );
  }

  handleClick(event) {
    SimpleMenuItem.closeMenu(event);
  }

  static closeMenu(_event) {
    const box = document.querySelector('.page-wrapper');
    box.classList.remove('header-nav--open');
  }
}

SimpleMenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired
}

export default SimpleMenuItem;
