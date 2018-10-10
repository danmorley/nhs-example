import React from 'react';
import ReactDOM from 'react-dom';
import HeadingBodyShelf from './HeadingBodyShelf';

describe('HeadingBodyShelf', () => {
  let content = {
    heading: 'test',
    body: 'test',
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HeadingBodyShelf content={content }/>, div)
  })
})
