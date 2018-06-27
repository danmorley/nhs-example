import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CmsComponentRegistry from '../CmsComponentRegistry';

/**
 *  Inline Script Panel is a simple panel that can be used to
 *  insert some inline javascript.
 *
 *  It expects the following properties:
 *  - content
 *
 *  content: {
 *    script: 'let some.inline.javascript = true;',
 *    src: 'https://domain.a.com/path/to/script.js'
 *  }
 *
 *  The script can either be provided inline, or by loading an external script.
 */
class InlineScriptPanel extends Component {
  componentDidMount() {
    let { id, content } = this.props;

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.id = id + '-script';

    if (content.src) {
      s.src = content.src;
    } else {
      s.innerHTML = content.script || '';
    }

    this.instance.appendChild(s);
  }

  render() {
    let { id } = this.props;

    return [
      <div key="1" id={id} />,
      <div key="2" ref={el => (this.instance = el)} />
    ]
  }
}

InlineScriptPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
}

CmsComponentRegistry.register('inline_script_panel', InlineScriptPanel, 'inline-script-panel');

export default InlineScriptPanel;
