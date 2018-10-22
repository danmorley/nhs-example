import React from 'react';
import ReactDOM from 'react-dom';
import DividerShelf from './DividerShelf';

describe('DividerShelf', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DividerShelf />, div)
  })
})
