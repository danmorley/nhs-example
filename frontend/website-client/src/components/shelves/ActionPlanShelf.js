import React, { Component } from 'react';
import './action-plan-shelf.css'
import PropTypes from 'prop-types';
import Shelf from '../shelves/Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import ActionGroupPanel from '../panels/ActionGroupPanel';
import CtaLinks from '../shared/CtaLinks';

const BASKET_KEY = 'basket';

class ActionPlanShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedGroup: null,
      actionPlanCount: 0
    }
  }

  componentDidMount() {
    this.setState({actionPlanCount: this.storageToJSON(BASKET_KEY, []).length});
  }

  setExpandedGroup(group) {
    this.setState({ expandedGroup: group });
  }

  updateBasketLength() {
    this.setState({actionPlanCount: this.storageToJSON(BASKET_KEY, []).length})
  }

  storageToJSON(key, defaultValue) {
    if (sessionStorage.getItem(key) && sessionStorage.getItem(key) !== '') {
      return JSON.parse(sessionStorage.getItem(key))
    } else {
      return defaultValue;
    }
  }

  render() {
    let { id, classNamePrefix, content } = this.props;
    let actionGroups = content.action_groups;
    const ctaDisabled = this.state.actionPlanCount === 0;
    console.log(ctaDisabled, this.state.actionPlanCount)

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
              expandedGroup={this.state.expandedGroup}
              updateBasketLength={this.updateBasketLength.bind(this)} />
          )}

          <div className={`${classNamePrefix}--cta`}>
            <CtaLinks disabled={ctaDisabled} cta={content.cta} variant='button' />
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
