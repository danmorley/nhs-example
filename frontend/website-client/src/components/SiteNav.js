import React, { Component } from 'react';

class SiteNav extends Component {
  render() {
    return (
      <nav className="main-nav">
        The site menu goes here: {this.props.items.length}
      </nav>
    );
  }
}

export default SiteNav;
