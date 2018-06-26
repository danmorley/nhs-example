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
class RichTextPanel extends Component {
  render() {
    let { content, ...rest } = this.props;
    if (!content) return null;

    return (<Text tagName="div" content={content.text} format='richtext' className="simple-text" {...rest} />);
  }
}

RichTextPanel.propTypes = {
  content: PropTypes.object.isRequired,
};

CmsComponentRegistry.register('rich_text_panel', RichTextPanel, 'rich-text-panel');

export default RichTextPanel;
