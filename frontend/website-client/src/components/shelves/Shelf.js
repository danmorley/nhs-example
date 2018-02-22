import React, { Component } from 'react';

class Shelf extends Component {
  shelfId() {
    return 'shelf-' + this.props.id;
  }

  shelfClasses() {
    let classNamePrefix = this.props.classNamePrefix || 'basic';
    let variant = this.props.variant || 'basic';
    return `row shelf ${classNamePrefix}-shelf ${variant}-shelf`;
  }

  render() {
    return (
      <div id={this.shelfId()} className={this.shelfClasses()} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default Shelf;
