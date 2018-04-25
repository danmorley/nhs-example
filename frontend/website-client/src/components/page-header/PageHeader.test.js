import React from 'react';
import PageHeader from './PageHeader';
import { shallow } from 'enzyme';

describe('PageHeader', () => {
  let header = {
      title: 'test',
    };

  it('renders without crashing', () => {
    const wrapper = shallow(<PageHeader header={header} />);
    expect(wrapper.exists()).toBe(true);
  })

})
