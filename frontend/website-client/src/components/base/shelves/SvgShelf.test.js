import React from 'react';
import ReactDOM from 'react-dom';
import SvgShelf from './SvgShelf';

beforeEach(function(){
  spyOn(console, 'error');
});

describe('SvgShelf', () => {
  let content = {
    svg: '<svg id="ig-test" style="enable-background:new 0 0 1366 768;" version="1.1" viewbox="0 0 1366 768" x="0px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" y="0px"><g id="Layer_1"><circle cx="680.5" cy="375.5" r="79"></circle></g></svg>',
    styles: '#ig-test .dtext { fill: red !important; stroke: red; }',
    script: 'let some.inline.javascript = true;'
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SvgShelf content={content} />, div);
    expect(console.error).toHaveBeenCalled();
  })
})
