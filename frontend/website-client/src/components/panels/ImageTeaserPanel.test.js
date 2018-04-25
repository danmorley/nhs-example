import React from 'react';
import ReactDOM from 'react-dom';
import ImageTeaserPanel from './ImageTeaserPanel';

describe('ImageTeaserPanel', () => {
  let content = {
    image: 'test',
  }
  let classNamePrefix = 'test'
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ImageTeaserPanel content={content} classNamePrefix={classNamePrefix} />, div)
  })
})
