import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import Text from '../../base/Text';
import Panel from '../../base/panels/Panel';

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
    const { content, classNamePrefix } = this.props;
    if (!content) return null;

    return (
      <Panel id={content.panel_id || this.props.id}
        classNamePrefix={classNamePrefix}
        variant={content.meta_variant}
        layout={content.meta_layout}>
        <Text tagName="div" content={content.text} className="simple-text" />
      </Panel>
    );
  }
}

SimpleTextPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('simple_text_panel', SimpleTextPanel, 'simple-text-panel');

export default SimpleTextPanel;
