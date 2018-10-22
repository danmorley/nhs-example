import React from 'react';
import ReactDOM from 'react-dom';
import SocialLinks from './SocialLinks';

describe('SocialLinks', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SocialLinks />, div)
  })
})
