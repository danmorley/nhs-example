import React, { Component } from 'react';
import './action-plan-shelf.css'
import PropTypes from 'prop-types';
import Shelf from '../shelves/Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import ActionGroupPanel from '../panels/ActionGroupPanel';
import CtaLinks from '../shared/CtaLinks';

class ActionPlanShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedGroup: null,
      actionPlan: {}
    }
  }

  setExpandedGroup(group) {
    this.setState({ expandedGroup: group });
  }

  render() {
    let { id, classNamePrefix, content } = this.props;
    let actionGroups = content.action_groups;

    const panelInfo = CmsComponentRegistry.components['action_group_panel'];
    const panelClassNamePrefix = panelInfo && panelInfo.classNamePrefix;
    const panelVariant = panelInfo && panelInfo.variant;
    const panelLayout = panelInfo && panelInfo.layout;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix}>
        <div className={`shelf__container container`}>
          { actionGroups.map((group, i) =>
            <ActionGroupPanel key={i} id={group.panel_id} classNamePrefix={panelClassNamePrefix}
              variant={panelVariant} layout={panelLayout} content={group.value}
              setExpandedGroup={this.setExpandedGroup.bind(this)}
              expandedGroup={this.state.expandedGroup} />
          )}

          <div className={`${classNamePrefix}--cta`}>
            <CtaLinks cta={content.cta} variant='button' />
          </div>
        </div>
      </Shelf>
    );
  }
}

ActionPlanShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('action_plan_shelf', ActionPlanShelf, 'action-plan-shelf');

export default ActionPlanShelf;
