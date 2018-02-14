import React, { Component } from 'react';
import SiteNav from '../header-nav/SiteNav';
import styles from './page-header.css';

class pageHeader extends Component {

  render() {
    let items = this.props.navItems;
    return (
      <div class="container-fluid page-header">
        <div class="row">
          <div class="col-sm-2">
            <a href="#" class="page-header__logo h1">
              One <span>You</span>
            </a>
          </div>
          <div class ="col-sm-10">
            <SiteNav navItems={items} />
          </div>
        </div>
      </div>
    );
  }
}

export default pageHeader;
