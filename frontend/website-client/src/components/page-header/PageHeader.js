import React, { Component } from 'react';
import SiteNav from '../header-nav/SiteNav';
import Text from '../Text';
import styles from './page-header.css';

class PageHeader extends Component {
  render() {
    let { navItems, header } = this.props;

    return (
      <div className="container-fluid page-header">
        <div className="container">
          <div className="page-header__row">
            <div className="page-header__info">
              <button className="page-header__burger" onClick={this.handleClick.bind(this)}>
                  <i className="font-icon"></i>
              </button>
              <a className="page-header__logo h1">
                <Text content={header.title || 'html::One <span>You</span>'} />
              </a>
            </div>
            <SiteNav navItems={navItems} />
          </div>
        </div>
      </div>
    );
  }

  handleClick(event) {
    const box = document.querySelector('.page-wrapper');
    event.preventDefault()
    box.classList.toggle('header-nav--open');
  }
}

export default PageHeader;
