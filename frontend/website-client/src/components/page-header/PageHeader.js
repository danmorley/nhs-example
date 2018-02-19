import React, { Component } from 'react';
import SiteNav from '../header-nav/SiteNav';
import styles from './page-header.css';

class pageHeader extends Component {

  render() {

    let items = this.props.navItems;

    return (
      <div className="container page-header">
        <div className="row">
          <div className="col-sm-2">
            <button className="page-header__burger" onClick={this.handleClick.bind(this)}>
                <i className="material-icons">&#xE5D2;</i>
            </button>
            <a href="#" className="page-header__logo h1">
              One <span>You</span>
            </a>
          </div>
          <div className ="col-sm-10">
            <SiteNav navItems={items} />
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

export default pageHeader;
