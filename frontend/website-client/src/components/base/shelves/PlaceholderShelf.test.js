import React from 'react';
import ReactDOM from 'react-dom';
import PlaceholderShelf from './PlaceholderShelf';

beforeEach(function(){
  spyOn(console, 'error');
});

describe('PlaceholderShelf', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PlaceholderShelf />, div);
    expect(console.error).toHaveBeenCalled();
  })
})
