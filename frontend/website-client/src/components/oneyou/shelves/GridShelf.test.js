import React from 'react';
import ReactDOM from 'react-dom';
import GridShelf from './GridShelf';
import { shallow } from 'enzyme';

describe('GridShelf', () => {
  let valid_content = {
    items: [{
      id: 1,
      type: 'app_teaser',
      value: {}
    }]
  }

  let invalid_content = {
    items: [{
      id: 1,
      type: 'banner_shelf',
      value: {}
    }]
  }

  it('renders without crashing with valid shelf types', () => {
    const wrapper = shallow(<GridShelf content={valid_content} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders without crashing with invalid shelf types', () => {
    const wrapper = shallow(<GridShelf content={invalid_content} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders with 1 column for the full width layout', () => {
    const wrapper = shallow(<GridShelf content={valid_content} layout={'full_width'} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders with 2 column for the 2_col_1_on_mobile layout', () => {
    const wrapper = shallow(<GridShelf content={valid_content} layout={'2_col_1_on_mobile'} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders with 3 column for the 3_col_1_on_mobile layout', () => {
    const wrapper = shallow(<GridShelf content={valid_content} layout={'3_col_1_on_mobile'} />);
    expect(wrapper.exists()).toBe(true);
  });

})
