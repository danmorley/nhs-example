import React from 'react';
import ReactDOM from 'react-dom';
import CtaLinks from './CtaLinks';

describe('CtaLinks', () => {
  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<CtaLinks />, div);
  });
})
