import React from 'react';
import ReactDOM from 'react-dom';
import ScriptShelf from './ScriptShelf';

beforeEach(function(){
  spyOn(console, 'error');
});

describe('ScriptShelf', () => {
  let content= {
    script: 'let some.inline.javascript = true;'
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ScriptShelf content={content} />, div);
    expect(console.error).toHaveBeenCalled();
  })
})
