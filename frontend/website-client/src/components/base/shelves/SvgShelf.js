import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from '../../base/shelves/Shelf';
import InlineSvgPanel from '../panels/InlineSvgPanel';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import startsWith from 'lodash.startswith';

/**
 *  SVG Shelf is a simple shelf that wraps a single InlineSvgPanel.
 *
 */
class SvgShelf extends Component {
  render() {
    const { id, content, classNamePrefix } = this.props;

    // Generate suitable shelf and panel ids.
    let shelfId, panelId;
    if (startsWith(id, 'shelf-')) {
      // Id is auto-generated by Wagtail.
      shelfId = id;
      panelId = id.replace('shelf', 'panel');
    } else {
      // User has provided a custom id.
      shelfId = `${id}-wrapper`;
      panelId = id;
    }

    return (
      <Shelf id={shelfId} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className="shelf__container container">
          <InlineSvgPanel id={panelId} content={content} />
        </div>
      </Shelf>
    )
  }
}

SvgShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
}

CmsComponentRegistry.register('svg_shelf', SvgShelf, 'svg-shelf');

export default SvgShelf;
