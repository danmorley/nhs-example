import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from './Shelf';
import InlineScriptPanel from '../panels/InlineScriptPanel';
import CmsComponentRegistry from '../CmsComponentRegistry';

/**
 *  Script Shelf is a simple shelf that wraps a single InloneScriptPanel.
 *
 */
class ScriptShelf extends Component {
  render() {
    let { id, content, classNamePrefix } = this.props;

    return (
      <Shelf id={`${id}-wrapper`} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className="shelf__container container">
          <InlineScriptPanel id={id} content={content} />
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
