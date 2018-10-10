import React from 'react';
import ReactDOM from 'react-dom';
import Shelf from './Shelf';

describe('Shelf', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Shelf />, div)
  })
})
