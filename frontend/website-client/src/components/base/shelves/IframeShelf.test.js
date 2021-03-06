import React from 'react';
import ReactDOM from 'react-dom';
import IframeShelf from './IframeShelf';

beforeEach(function(){
  spyOn(console, 'error');
});

describe('IframeShelf', () => {
  let content = {
    heading: 'test',
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<IframeShelf content={content} />, div);
    expect(console.error).toHaveBeenCalled();
  })
})
