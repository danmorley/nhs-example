import React from 'react';
import ReactDOM from 'react-dom';
import InformationPanel from './InformationPanel';

describe('InformationPanel', () => {
  let content = {
    image: 'test',
  }
  let classNamePrefix = 'test'
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InformationPanel content={content} classNamePrefix={classNamePrefix} />, div)
  })
})
