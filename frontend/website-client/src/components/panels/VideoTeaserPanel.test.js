import React from 'react';
import ReactDOM from 'react-dom';
import VideoTeaserPanel from './VideoTeaserPanel';

describe('VideoTeaserPanel', () => {
  let content = {
    image: 'test',
  };
  let classNamePrefix = 'test';
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VideoTeaserPanel content={content} classNamePrefix={classNamePrefix}/>, div)
  })
})
