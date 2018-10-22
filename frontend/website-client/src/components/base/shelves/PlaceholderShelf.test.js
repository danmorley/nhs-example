import React from 'react';
import ReactDOM from 'react-dom';
import PlaceholderShelf from './PlaceholderShelf';

describe('PlaceholderShelf', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PlaceholderShelf />, div)
  })
})
