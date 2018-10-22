import React from 'react';
import ReactDOM from 'react-dom';
import withOwnContent from './withOwnContent';

describe('withOwnContent', () => {
  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<withOwnContent />, div);
  });
})
