import React from 'react';
import ReactDOM from 'react-dom';
import SiteNav from './SiteNav';

describe('SiteNav', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SiteNav />, div)
  })
})
