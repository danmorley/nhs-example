import React from 'react';
import ReactDOM from 'react-dom';
import CtaLink from './CtaLink';

describe('CtaLink', () => {
  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<CtaLink />, div);
  });
})
