import React, { Component } from 'react';

class Shelf extends Component {
  shelfId() {
    return 'shelf-' + this.props.id;
  }

  shelfClasses() {
    let classNamePrefix = this.props.classNamePrefix || 'basic';
    return this.props.variant ? `row shelf ${classNamePrefix}-shelf ${this.props.variant}-shelf` : `row shelf ${classNamePrefix}-shelf`;
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
