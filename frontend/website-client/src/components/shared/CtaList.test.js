import React from 'react';
import ReactDOM from 'react-dom';
import CtaList from './CtaList';

describe('CtaList', () => {
  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<CtaList />, div);
  });
})
