import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from './Shelf';
import InlineScriptPanel from '../panels/InlineScriptPanel';
import CmsComponentRegistry from '../CmsComponentRegistry';
import startsWith from 'lodash.startswith';

/**
 *  Script Shelf is a simple shelf that wraps a single InlineScriptPanel.
 *
 */
class ScriptShelf extends Component {
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
          <InlineScriptPanel id={panelId} content={content} classNamePrefix="inline-script-panel" />
        </div>
      </Shelf>
    )
  }
}

ScriptShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
}

CmsComponentRegistry.register('script_shelf', ScriptShelf, 'script-shelf');

export default ScriptShelf;
