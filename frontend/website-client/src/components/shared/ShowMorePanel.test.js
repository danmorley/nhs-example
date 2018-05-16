import React from 'react';
import ReactDOM from 'react-dom';
import ShowMorePanel from './ShowMorePanel';

describe('ShowMorePanel', () => {
  let children = [];
  let rowsToShow = 0;
  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<ShowMorePanel children={children} rowsToShow={rowsToShow} />, div);
  });
})
