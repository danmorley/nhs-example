import React from 'react';
import ReactDOM from 'react-dom';
import GridShelf from './GridShelf';
import { shallow } from 'enzyme';

describe('GridShelf', () => {
  let content = {
    items: [{
      id: 1,
      type: 'app_teaser',
      value: {}
    }]
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<GridShelf content={content} />);
    expect(wrapper.exists()).toBe(true);
  })
})
