import React from 'react';
import ReactDOM from 'react-dom';
import ShowMorePanel from './ShowMorePanel';

describe('ShowMorePanel', () => {
  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<ShowMorePanel />, div);
  });
})
