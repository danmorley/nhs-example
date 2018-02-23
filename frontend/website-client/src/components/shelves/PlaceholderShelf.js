import React, { Component } from 'react';
import ShelfRegistry from './ShelfRegistry';
import Shelf from './Shelf';
import styles from './shelves.css';

class PlaceholderShelf extends Component {
  render() {
    return (
      <Shelf id={this.props.id} classNamePrefix="placeholder">
        <div className="col-sm-12 shelf__placeholder">
          <h2 className="shelf__header">Placeholder Shelf</h2>
          <button className="button button--default">Have a Go</button>
          <p>This is a temporary placeholder for a shelf of type: {this.props.shelfType}</p>
        </div>
      </Shelf>
    );
  }
}

ShelfRegistry.register('placeholder_shelf', PlaceholderShelf);

export default PlaceholderShelf;
