import React, { Component } from 'react';
import CmsComponentRegistry from '../CmsComponentRegistry';
import Shelf from './Shelf';
import styles from './shelves.css';

class PlaceholderShelf extends Component {
  render() {
    return (
      <Shelf id={this.props.id} classNamePrefix="placeholder">
        <div className="col-sm-12 shelf__placeholder">
          <h2 className="shelf__header">Placeholder Shelf</h2>
          <p>This is a temporary placeholder for a shelf of type: {this.props.shelfType}</p>
        </div>
      </Shelf>
    );
  }
}

CmsComponentRegistry.register('placeholder_shelf', PlaceholderShelf);

export default PlaceholderShelf;
