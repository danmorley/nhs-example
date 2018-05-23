import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    s.innerHTML = content.script;
    this.instance.appendChild(s);
  }

  render() {
    return <div ref={el => (this.instance = el)} />;
  }
}

ScriptShelf.propTypes = {
  content: PropTypes.object.isRequired
}

CmsComponentRegistry.register('script_shelf', ScriptShelf, 'script-shelf');

export default ScriptShelf;
