import React from 'react';
import ReactDOM from 'react-dom';
import AppTeaserPanel from './AppTeaserPanel';

describe('AppTeaserPanel', () => {
  let content = {
    image: 'test',
  }
  let classNamePrefix = 'test'

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppTeaserPanel content={content} classNamePrefix={classNamePrefix}/>, div)
  })
})
