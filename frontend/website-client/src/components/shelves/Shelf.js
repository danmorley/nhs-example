import React, { Component } from 'react';

class Shelf extends Component {
  shelfId() {
    return 'shelf-' + this.props.id;
  }

  shelfClasses() {
    return 'row shelf shelf-' + this.props.id;
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
