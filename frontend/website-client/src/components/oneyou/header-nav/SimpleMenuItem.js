import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Text from '../../base/Text';
import { Link } from 'react-router-dom';

class SimpleMenuItem extends Component {
  render() {
    let { link_page, link_external, link_text } = this.props.item.value;
    if (link_page.relative_path) {
      return (
        <li className={this.props.classNamePrefix + "-nav__item"}>
          <div className={this.props.classNamePrefix + "-nav__separator"}>   
            <Link onClick={this.handleClick.bind(this)} innerRef={(el) => (this.instance = el)}  to={link_page.relative_path}
              className={this.props.classNamePrefix + "-nav__link"}>
              <Text tagName="span" content={link_text}/>
            </Link>
          </div>
        </li>
      );
    } else {
      return (
        <li className={this.props.classNamePrefix + "-nav__item"}>
          <div className={this.props.classNamePrefix + "-nav__separator"}>
            <a onClick={this.handleClick} href={link_external} 
              className={this.props.classNamePrefix + "-nav__link"}>
              <Text tagName="span" content={link_text}/>
            </a>
          </div>
        </li>
      );
    }
  }

  handleClick(event) {
    this.instance.blur();
    SimpleMenuItem.closeMenu(event, this);
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
