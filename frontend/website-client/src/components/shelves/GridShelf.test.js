import React from 'react';
import ReactDOM from 'react-dom';
import GridShelf from './GridShelf';

describe('GridShelf', () => {
  let content = {
    items: ['test', 'test']
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GridShelf content={content} />, div)
  })
})
