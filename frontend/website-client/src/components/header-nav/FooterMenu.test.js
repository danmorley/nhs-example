import React from 'react';
import ReactDOM from 'react-dom';
import FooterMenu from './FooterMenu';
import { shallow } from 'enzyme';

describe('FooterMenu', () => {

  let items = [
    {
      'type': 'simple_menu_item',
    }
  ]

  it('renders without crashing', () => {
    const wrapper = shallow(<FooterMenu items={items} />)
    expect(wrapper.exists()).toBe(true);
  })

})
