import React, { Component } from 'react';
import Shelf from './Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './divider-shelf.css';

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
      <Shelf id={id} layout={'no-padding'}>
        <hr className='divider-shelf' />
      </Shelf>
    );
  }
}

CmsComponentRegistry.register('divider', DividerShelf, 'divider-shelf');

export default DividerShelf;
