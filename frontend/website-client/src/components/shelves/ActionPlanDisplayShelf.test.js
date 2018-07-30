import React from 'react';
import ReactDOM from 'react-dom';
import ActionPlanDisplayShelf from './ActionPlanDisplayShelf';
import { shallow } from 'enzyme';

const ACTION_PLAN_KEY = 'action_plan';

describe('ActionPlanDisplayShelf', () => {
  let content = {
    title: 'A test action plan',
    body: 'More details about your test action plan'
  };

  let emptyContent = {};

  let action = {
    title: 'Test Action',
    action_code: 'test_code'
  };

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
    updatedActionPlan[content.action_code] = content;
    sessionStorage.setItem(ACTION_PLAN_KEY, JSON.stringify(updatedActionPlan));
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionPlanDisplayShelf content={content} classNamePrefix={classNamePrefix}/>, div);
    expect(component.state.actionPlan).toEqual(updatedActionPlan);
  });

  it('returns the default value from storageToJson if the requested item is not in the storage', () => {
    sessionStorage.removeItem(ACTION_PLAN_KEY);
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionPlanDisplayShelf content={content} classNamePrefix={classNamePrefix}/>, div)
    const defaultValue = {}
    expect(component.storageToJSON(ACTION_PLAN_KEY, defaultValue)).toEqual(defaultValue);
  });

  it('returns the default value from storageToJson if the requested item in the storage is empty', () => {
    sessionStorage.setItem(ACTION_PLAN_KEY, '');
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
