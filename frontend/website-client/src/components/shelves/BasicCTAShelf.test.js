import React from 'react';
import ReactDOM from 'react-dom';
import BasicCTAShelf from './BasicCTAShelf';

describe('BasicCTAShelf', () => {
  let content = {
    meta_variant: 'test',
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BasicCTAShelf content={content} />, div)
  })
})
