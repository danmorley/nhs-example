import React from 'react';
import ReactDOM from 'react-dom';
import EmailButtonPanel from './EmailButtonPanel';
import { shallow } from 'enzyme';

describe('EmailButtonPanel', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<EmailButtonPanel />);
    expect(wrapper.exists()).toBe(true);
  })
})
