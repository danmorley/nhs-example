import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CmsComponentRegistry from '../CmsComponentRegistry';
import Text from '../Text';

/**
 *  SimpleTextPanel is a simple field that will output escaped text or
 *  raw HTML text.
 *
 *  It expects the following properties:
 *  - content
 *
 */
class SimpleTextPanel extends Component {
  render() {
    let { content, ...rest } = this.props;
    if (!content) return null;

    return (<Text tagName="div" content={content.text} className="simple-text" {...rest} />);
  }
}

SimpleTextPanel.propTypes = {
  content: PropTypes.object.isRequired,
};

CmsComponentRegistry.register('simple_text_panel', SimpleTextPanel, 'simple-text-panel');

export default SimpleTextPanel;
