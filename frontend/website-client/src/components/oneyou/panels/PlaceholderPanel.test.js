import React from 'react';
import ReactDOM from 'react-dom';
import PlaceholderPanel from './PlaceholderPanel';

beforeEach(function(){
  spyOn(console, 'error');
});

describe('PlaceholderPanel', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PlaceholderPanel />, div);
    expect(console.error).toHaveBeenCalled();
  })
})
