import React from 'react';
import ReactDOM from 'react-dom';
import Oneyou1TeaserPanel from './Oneyou1TeaserPanel';

describe('Oneyou1TeaserPanel', () => {
  let content = {
    image: 'test',
  }
  let classNamePrefix = 'test'
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Oneyou1TeaserPanel content={content} classNamePrefix={classNamePrefix} />, div)
  })
})
