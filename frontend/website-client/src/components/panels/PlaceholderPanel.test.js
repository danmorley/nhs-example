import React from 'react';
import ReactDOM from 'react-dom';
import PlaceholderPanel from './PlaceholderPanel';

describe('PlaceholderPanel', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PlaceholderPanel />, div)
  })
})
