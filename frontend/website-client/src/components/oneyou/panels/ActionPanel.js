import React, { Component } from 'react';
import './action-panel.css';
import PropTypes from 'prop-types';
import Panel from './Panel';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';

const BASKET_KEY = 'basket';
const ACTION_PLAN_KEY = 'action_plan';

class ActionPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  componentDidMount() {
    if (this.storageToJSON(BASKET_KEY, []).indexOf(this.props.content.action_code) !== -1) {
      this.setState({active: true});
    }
  }

  UNSAFE_componentWillReceiveProps() {
    if (this.storageToJSON(BASKET_KEY, []).indexOf(this.props.content.action_code) !== -1) {
      this.setState({active: true});
    } else {
      this.setState({active: false});
    }
  }

  handleClick() {
    const currentActiveState = this.state.active;
    let newActiveState = !currentActiveState;
    this.updateActionPlan(newActiveState);
    this.setState({active: newActiveState });
  }

  storageToJSON(key, defaultValue) {
    if (sessionStorage.getItem(key) && sessionStorage.getItem(key) !== '') {
      return JSON.parse(sessionStorage.getItem(key))
    } else {
      return defaultValue;
    }
  }

  updateActionPlan(active) {
    let currentBasketContents = this.storageToJSON(BASKET_KEY, []);
    let currentActionPlanContents = this.storageToJSON(ACTION_PLAN_KEY, {})
    if (active) {
      currentBasketContents.push(this.props.content.action_code);
      currentActionPlanContents[this.props.content.action_code] = this.props.content;
    } else {
      let position = currentBasketContents.indexOf(this.props.content.action_code)
      currentBasketContents.splice(position, 1);
      delete currentActionPlanContents[this.props.content.action_code];
    }
    sessionStorage.setItem(BASKET_KEY, JSON.stringify(currentBasketContents));
    sessionStorage.setItem(ACTION_PLAN_KEY, JSON.stringify(currentActionPlanContents));
    this.props.updateBasketLength();
  }

  render() {
    let { id, classNamePrefix, content } = this.props;
    let className = this.state.active ? 'clicked' : '';

    return (
      <Panel id={id} classNamePrefix={classNamePrefix}>
        <div>
          <div className={`${classNamePrefix}--toggle ${className}`} onClick={this.handleClick.bind(this)} data-name={`Action-${content.title}`} data-tracking-event="ActionClick" >
          </div>
        </div>

        <p className={`${classNamePrefix}--title ${className}`}>{content.title}</p>
      </Panel>
    );
  }
}

ActionPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string,
  updateBasketLength: PropTypes.func.isRequired
};

CmsComponentRegistry.register('action_panel', ActionPanel, 'action-panel');

export default ActionPanel;
