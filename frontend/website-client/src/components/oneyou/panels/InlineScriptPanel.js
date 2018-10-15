import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import Panel from './Panel';

/**
 *  Inline Script Panel is a simple panel that can be used to
 *  insert some inline javascript.
 *
 *  It expects the following properties:
 *  - content
 *
 *  content: {
 *    script: 'let some.inline.javascript = true;',
 *    src: 'https://domain.a.com/path/to/script.js',
 *    field_id: 'abc',
 *    placeholder_id: 'def'
 *  }
 *
 *  The script can either be provided inline, or by loading an external script.
 * 
 *  The optional field_id is used for naming the panel. If not supplied, the uuid supplied by Wagtail
 *  is used.
 * 
 *  If the placeholder_id is given, an additional empty div is added immediately before the inline
 *  script tag.
 */
class InlineScriptPanel extends Component {
  componentDidMount() {
    let { content } = this.props;

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    
    if (content.script_id) {
      s.id = content.script_id;
    }

    if (content.src) {
      s.src = content.src;
    } else {
      s.innerHTML = content.script || '';
    }

    if (this.instance) this.instance.parentNode.replaceChild(s, this.instance);
  }

  render() {
    let { id, content, classNamePrefix } = this.props;

    return (
      <Panel id={id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        { content.placeholder_id && <div id={content.placeholder_id} /> }
        <div ref={el => (this.instance = el)} />
      </Panel>
    )
  }
}

InlineScriptPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
}

CmsComponentRegistry.register('inline_script_panel', InlineScriptPanel, 'inline-script-panel');

export default InlineScriptPanel;
