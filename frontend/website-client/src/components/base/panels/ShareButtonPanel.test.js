import React from 'react';
import ReactDOM from 'react-dom';
import ShareButtonPanel from './ShareButtonPanel';

describe('ShareButtonPanel', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShareButtonPanel />, div)
  })
})
