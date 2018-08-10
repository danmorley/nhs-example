import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CmsComponentRegistry from '../CmsComponentRegistry';
import Text from '../Text';
import Panel from './Panel';
import './rich-text-panel.css';

/**
 *  RichTextPanel is a simple field that will output rich text originating from
 *  a Wagtail rich text field.
 *
 *  It expects the following properties:
 *  - content
 *
 */
class RichTextPanel extends Component {
  render() {
    const { content, classNamePrefix } = this.props;
    if (!content) return null;

    return (
      <Panel id={content.panel_id || this.props.id}
        classNamePrefix={classNamePrefix}
        variant={content.meta_variant}
        layout={content.meta_layout}>
        <Text tagName="div" content={content.text} format="richtext" className="rich-text" />
      </Panel>
    );
  }
}

RichTextPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('rich_text_panel', RichTextPanel, 'rich-text-panel');

export default RichTextPanel;
