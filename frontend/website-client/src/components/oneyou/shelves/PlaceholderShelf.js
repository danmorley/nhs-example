import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import Shelf from '../../base/shelves/Shelf';
import './shelves.css';

class PlaceholderShelf extends Component {
  render() {
    let { id, shelfType } = this.props;

    return (
      <Shelf id={id} classNamePrefix="placeholder">
        <div className="col-sm-12 shelf__placeholder">
          <h2 className="placeholder__header">Placeholder Shelf</h2>
          <p>This is a temporary placeholder for a shelf of type: {shelfType}</p>
        </div>
      </Shelf>
    );
  }
}

PlaceholderShelf.propTypes = {
  shelfType: PropTypes.string.isRequired,
  id: PropTypes.string
}

CmsComponentRegistry.register('placeholder_shelf', PlaceholderShelf, 'placeholder-shelf');

export default PlaceholderShelf;
