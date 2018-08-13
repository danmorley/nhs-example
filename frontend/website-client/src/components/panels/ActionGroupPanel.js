import React, { Component } from 'react';
import './action-group-panel.css';
import PropTypes from 'prop-types';
import Panel from './Panel';
import CmsComponentRegistry from '../CmsComponentRegistry';
import ActionPanel from './ActionPanel';

class ActionGroupPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  toggle() {
    const currentExpandedState = this.state.expanded;
    if (currentExpandedState) {
      this.collapse();
      this.props.setExpandedGroup(null);
    } else {
      if (this.props.expandedGroup) {
        this.props.expandedGroup.collapse();
      }
      this.expand();
      this.props.setExpandedGroup(this);
    }
  }

  collapse() {
    this.setState({ expanded: false });
  }

  expand() {
    this.setState({ expanded: true });
  }

  render() {
    let { id, classNamePrefix, content } = this.props;
    let expanded = this.state.expanded;
    const headingClass = expanded ? 'open' : 'closed';

    const panelInfo = CmsComponentRegistry.components['action_panel'];
    const panelClassNamePrefix = panelInfo && panelInfo.classNamePrefix;
    const panelVariant = panelInfo && panelInfo.variant;
    const panelLayout = panelInfo && panelInfo.layout;

    return (
      <Panel id={id} classNamePrefix={classNamePrefix}>
        <div className={`${classNamePrefix}--heading ${headingClass}`} onClick={this.toggle.bind(this)}>
          <h2 className={`${classNamePrefix}--title`}>
            { content.title }
          </h2>
        </div>

        <div className={`${classNamePrefix}--action-list ${expanded ? '' : 'hidden'}`}>
          { content.actions.map((action, i) =>
            <div key={i} className='col-md-6'>
              <ActionPanel id={action.panel_id} classNamePrefix={panelClassNamePrefix}
                variant={panelVariant} layout={panelLayout} content={action.value}
                updateBasketLength={this.props.updateBasketLength} />
            </div>
          )}
        </div>
      </Panel>
    );
  }
}

ActionGroupPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string,
  setExpandedGroup: PropTypes.func.isRequired,
  expandedGroup: PropTypes.object,
  updateBasketLength: PropTypes.func.isRequired
};

CmsComponentRegistry.register('action_group_panel', ActionGroupPanel, 'action-group-panel');

export default ActionGroupPanel;
