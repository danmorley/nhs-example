import React, { Component } from 'react';

class Shelf extends Component {
  shelfClasses() {
    return 'row shelf shelf-' + this.props.id;
  }
}

export default Shelf;
