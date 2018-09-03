import React, { Component } from 'react';
import './action-plan-display-shelf.css';
import PropTypes from 'prop-types';
import Shelf from '../shelves/Shelf';
import Text from '../Text';
import CmsComponentRegistry from '../CmsComponentRegistry';
import ActionGroupPanel from '../panels/ActionGroupPanel';
import CtaLinks from '../shared/CtaLinks';

const ACTION_PLAN_KEY = 'action_plan';

class ActionPlanDisplayShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionPlan: {}
    }
  }

  componentDidMount() {
    this.setState({actionPlan: this.storageToJSON(ACTION_PLAN_KEY, {})});
  }

  storageToJSON(key, defaultValue) {
    if (sessionStorage.getItem(key) && sessionStorage.getItem(key) !== '') {
      return JSON.parse(sessionStorage.getItem(key))
    } else {
      return defaultValue
    }
  }

  render() {
    let { id, classNamePrefix, content } = this.props;
    let actionPlan = this.state.actionPlan;
    let actionPlanKeys = Object.keys(actionPlan);
    let heading = content.title || '';
    let contentBody = content.body || '';

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix}>
        <div className={`${classNamePrefix}--lead`}>
          <div className='container'>
            {heading != '' &&
              <Text tagName="h2" content={heading} className={`${classNamePrefix}--title`} />
            }
            {contentBody != '' &&
              <Text tagName="div" content={contentBody} className={`${classNamePrefix}--body`} format="richtext"/>
            }
          </div>
        </div>

        <div className={`shelf__container container`}>
          <ul className={`${classNamePrefix}--action-list`}>
            { actionPlanKeys.map((actionCode, i) =>
              <li key={i} className="col-sm-12 col-md-6">
                <div className={`${classNamePrefix}--action`}>
                  <div>{actionPlan[actionCode].title}</div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </Shelf>
    );
  }
}

ActionPlanDisplayShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('action_plan_display_shelf', ActionPlanDisplayShelf, 'action-plan-display-shelf');

export default ActionPlanDisplayShelf;
