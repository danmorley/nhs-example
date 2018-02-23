import React, { Component } from 'react';

class Shelf extends Component {
  shelfId() {
    return this.props.id ? 'shelf-' + this.props.id : null;
  }

  shelfClasses() {
    let classNamePrefix = this.props.classNamePrefix || 'basic';
    return this.props.variant ? `shelf ${classNamePrefix}-shelf ${this.props.variant}-shelf` : `shelf ${classNamePrefix}-shelf`;
  }

  render() {
    return (
      <section class="shelf-section">
        <div id={this.shelfId()} className={this.shelfClasses()} style={this.props.style}>
          {this.props.children}
        </div>
      </section>
    );
  }
}

export default Shelf;
