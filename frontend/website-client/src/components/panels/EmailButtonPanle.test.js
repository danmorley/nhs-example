import React from 'react';
import ReactDOM from 'react-dom';
import EmailButtonPanel from './EmailButtonPanel';

describe('EmailButtonPanel', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EmailButtonPanel />, div)
  })
})
