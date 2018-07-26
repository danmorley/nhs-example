import React from 'react';
import ReactDOM from 'react-dom';
import PrintButtonPanel from './PrintButtonPanel';

describe('PrintButtonPanel', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PrintButtonPanel />, div)
  })
})
