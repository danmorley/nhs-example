import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CmsComponentRegistry from '../CmsComponentRegistry';
import './list-item.css';
import Panel from './Panel';


/**
 *
 *  content: {
 *
 *  }
 */
class ListItemPanel extends Component {

  render() {
    let { content, classNamePrefix } = this.props;

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix}>
        <div className={`${classNamePrefix}__image`}>
          {content.text}
        </div>
      </Panel>
    );
  }
}

ListItemPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('list_item_panel', ListItemPanel, 'list-item');

export default ListItemPanel;
