import React from 'react';
import ReactDOM from 'react-dom';
import Panel from './Panel';

describe('Panel', () => {
  let classNamePrefix = 'test'

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Panel classNamePrefix={classNamePrefix}/>, div)
  })
})
