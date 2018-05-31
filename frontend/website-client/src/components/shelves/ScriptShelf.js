import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from './Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';

/**
 *  Script Shelf is a simple shelf that can be used to
 *  insert some inline javascript.
 *
 *  It expects the following properties:
 *  - content
 *
 *  content: {
 *    script: 'let some.inline.javascript = true;'
 *  }
 */
class ScriptShelf extends Component {
  componentDidMount() {
    let { content } = this.props;

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.id = content.id;

    if (content.src) {
      s.src = content.src;
    } else {
      s.innerHTML = content.script || '';
    }

    this.instance.appendChild(s);
  }

  render() {
    let { id, content, classNamePrefix } = this.props;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className="shelf__container container">
          <div ref={el => (this.instance = el)} />
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
