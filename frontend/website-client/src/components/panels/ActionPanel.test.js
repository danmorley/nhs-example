import React from 'react';
import ReactDOM from 'react-dom';
import ActionPanel from './ActionPanel';
import { shallow } from 'enzyme';

const BASKET_KEY = 'basket';
const ACTION_PLAN_KEY = 'action_plan';

describe('ActionPanel', () => {
  let content = {
    title: 'Test Action',
    action_code: 'test_code'
  };

  let classNamePrefix = 'action-panel';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ActionPanel content={content} classNamePrefix={classNamePrefix}/>, div)
  });

  it('renders as active if the action_code is in the basket', () => {
    let updatedBasket = [content.action_code];
    sessionStorage.setItem(BASKET_KEY, JSON.stringify(updatedBasket));
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionPanel content={content} classNamePrefix={classNamePrefix}/>, div)
    expect(component.state.active).toBeTruthy();
  });

  it('returns the default value from storageToJson if the requested item is not in the storage', () => {
    sessionStorage.removeItem(BASKET_KEY);
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionPanel content={content} classNamePrefix={classNamePrefix}/>, div)
    const defaultValue = []
    expect(component.storageToJSON(BASKET_KEY, defaultValue)).toEqual(defaultValue);
  });

  it('returns the default value from storageToJson if the requested item in the storage is empty', () => {
    sessionStorage.setItem(BASKET_KEY, '');
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionPanel content={content} classNamePrefix={classNamePrefix}/>, div)
    const defaultValue = []
    expect(component.storageToJSON(BASKET_KEY, defaultValue)).toEqual(defaultValue);
  });

  it('returns the storage value from storageToJson if the requested item is in the storage and not empty', () => {
    let updatedBasket = [content.action_code];
    sessionStorage.setItem(BASKET_KEY, JSON.stringify(updatedBasket));
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionPanel content={content} classNamePrefix={classNamePrefix}/>, div)
    const defaultValue = []
    expect(component.storageToJSON(BASKET_KEY, defaultValue)).toEqual(updatedBasket);
  });

  it('adds the action to the storage when updateActionPlan is called when active', () => {
    sessionStorage.setItem(BASKET_KEY, '');
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionPanel content={content} classNamePrefix={classNamePrefix} updateBasketLength={function() {}} />, div)
    const defaultValue = []
    expect(component.storageToJSON(BASKET_KEY, defaultValue)).toEqual(defaultValue);
    component.updateActionPlan(true);
    expect(component.storageToJSON(BASKET_KEY, defaultValue).includes(content.action_code)).toBeTruthy();
    expect(component.storageToJSON(ACTION_PLAN_KEY, defaultValue)[content.action_code]).toEqual(content);
  });

  it('removes the action from the storage when updateActionPlan is called when not active', () => {
    let updatedBasket = [content.action_code];
    let updatedActionPlan = {}
    updatedActionPlan[content.action_code] = content;
    sessionStorage.setItem(BASKET_KEY, JSON.stringify(updatedBasket));
    sessionStorage.setItem(ACTION_PLAN_KEY, JSON.stringify(updatedActionPlan));
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionPanel content={content} classNamePrefix={classNamePrefix} updateBasketLength={function() {}} />, div)
    const defaultValue = []
    expect(component.state.active).toBeTruthy();
    component.updateActionPlan(false);
    expect(component.storageToJSON(BASKET_KEY, defaultValue).includes(content.action_code)).toBeFalsy();
    expect(component.storageToJSON(ACTION_PLAN_KEY, defaultValue)[content.action_code]).toEqual(undefined);
  });

  it('toggles the action active and in/out of the storage when it handles a click', () => {
    sessionStorage.setItem(BASKET_KEY, '');
    sessionStorage.setItem(ACTION_PLAN_KEY, '');
    const div = document.createElement('div');
    let component = ReactDOM.render(<ActionPanel content={content} classNamePrefix={classNamePrefix} updateBasketLength={function() {}} />, div)
    const defaultValue = []
    expect(component.state.active).toBeFalsy();
    expect(component.storageToJSON(BASKET_KEY, defaultValue).includes(content.action_code)).toBeFalsy();
    expect(component.storageToJSON(ACTION_PLAN_KEY, defaultValue)[content.action_code]).toEqual(undefined);
    component.handleClick();
    expect(component.state.active).toBeTruthy();
    expect(component.storageToJSON(BASKET_KEY, defaultValue).includes(content.action_code)).toBeTruthy();
    expect(component.storageToJSON(ACTION_PLAN_KEY, defaultValue)[content.action_code]).toEqual(content);
    component.handleClick();
    expect(component.state.active).toBeFalsy();
    expect(component.storageToJSON(BASKET_KEY, defaultValue).includes(content.action_code)).toBeFalsy();
    expect(component.storageToJSON(ACTION_PLAN_KEY, defaultValue)[content.action_code]).toEqual(undefined);
  });
})
