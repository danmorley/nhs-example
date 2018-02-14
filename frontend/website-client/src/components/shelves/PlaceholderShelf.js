import React, { Component } from 'react';
import ShelfRegistry from './ShelfRegistry';
import styles from './shelves.css';

class PlaceholderShelf extends Component {
  render() {
    return (
      <div className="shelf">
        <h2 class="shelf__header">Placeholder Shelf</h2>
        <p>This is a temporary placeholder for a shelf of type: {this.props.shelfType}</p>
      </div>
    );
  }
}

ShelfRegistry.register(PlaceholderShelf, 'placeholder_shelf');

export default PlaceholderShelf;
