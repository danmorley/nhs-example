import React from 'react';
import ReactDOM from 'react-dom';
import ActionPlanDisplayShelf from './ActionPlanDisplayShelf';
import { shallow } from 'enzyme';

const ACTION_PLAN_KEY = 'action_plan';
const BASKET_KEY = 'basket';

describe('ActionPlanDisplayShelf', () => {
  let content = {
    action_code: 'test_code',
    title: 'A test action plan',
    body: 'More details about your test action plan'
  };

  let emptyContent = {};

  let classNamePrefix = 'action-plan-shelf';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ActionPlanDisplayShelf content={content} classNamePrefix={classNamePrefix}/>, div);
  });

  it('renders without crashing with empty content', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ActionPlanDisplayShelf content={emptyContent} classNamePrefix={classNamePrefix}/>, div);
  });

  it('renders without crashing with values in the sessionStorage', () => {
    let updatedActionPlan = {}
    let updatedBasket = []
    updatedActionPlan[content.action_code] = content;
    updatedBasket.push(content.action_code)
    sessionStorage.setItem(ACTION_PLAN_KEY, JSON.stringify(updatedActionPlan));
    sessionStorage.setItem(BASKET_KEY, JSON.stringify(updatedBasket));
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionPlanDisplayShelf content={content} classNamePrefix={classNamePrefix}/>, div);
    expect(component.state.actionPlan).toEqual(updatedActionPlan);
  });

  it('returns the default value from storageToJson if the requested item in the storage is empty', () => {
    sessionStorage.setItem(BASKET_KEY, '[]');
    sessionStorage.setItem(ACTION_PLAN_KEY, '{}');
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionPlanDisplayShelf content={content} classNamePrefix={classNamePrefix}/>, div)
    const defaultValue = {}
    expect(component.storageToJSON(ACTION_PLAN_KEY, defaultValue)).toEqual(defaultValue);
  });

  it('returns the storage value from storageToJson if the requested item is in the storage and not empty', () => {
    let updatedActionPlan = {}
    updatedActionPlan[content.action_code] = content;
    sessionStorage.setItem(ACTION_PLAN_KEY, JSON.stringify(updatedActionPlan));
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionPlanDisplayShelf content={content} classNamePrefix={classNamePrefix}/>, div)
    const defaultValue = {}
    expect(component.storageToJSON(ACTION_PLAN_KEY, defaultValue)).toEqual(updatedActionPlan);
  });
})
