import React from 'react';
import ReactDOM from 'react-dom';
import RichTextPanel from './RichTextPanel';

describe('RichTextPanel', () => {
  let classNamePrefix = 'test'
  let content = {};

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RichTextPanel content={content} classNamePrefix={classNamePrefix}/>, div)
  })
})
