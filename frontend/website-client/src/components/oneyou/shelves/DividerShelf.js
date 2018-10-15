import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from '../../base/shelves/Shelf';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import './divider-shelf.css';

/**
 *  Divider Shelf is a simple shelf that can be used to
 *  display a hr divider.
 *
 *  It expects the following properties:
 *  - styles (to be confirmed)
 *
 */
class DividerShelf extends Component {
  render() {
    let { id } = this.props;

    return (
      <Shelf id={id} layout="no-padding" classNamePrefix="divider">
        <div className="container">
          <hr className="divider-shelf" />
        </div>
      </Shelf>
    );
  }
}

DividerShelf.propTypes = {
  id: PropTypes.string
};

CmsComponentRegistry.register('divider', DividerShelf, 'divider-shelf');

export default DividerShelf;
