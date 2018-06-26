import React from 'react';
import ReactDOM from 'react-dom';
import MultiMenuItem from './MultiMenuItem';

describe('MultiMenuItem', () => {
  let item = {
    value: {menu_items: ['test', 'test', 'test']},
    type: 'simple_menu_item'
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MultiMenuItem item={item}/>, div)
  })
})
