import React from 'react';
import ReactDOM from 'react-dom';
import GuidanceShelf from './GuidanceShelf';

describe('GuidanceShelf', () => {
  let content = {
    heading: 'test',
    body: 'test',
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GuidanceShelf content={content }/>, div)
  })
})
