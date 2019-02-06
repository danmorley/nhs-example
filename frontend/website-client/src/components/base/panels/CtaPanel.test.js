import React from 'react';
import ReactDOM from 'react-dom';
import CtaPanel from './CtaPanel';

beforeEach(function(){
  spyOn(console, 'error');
});

describe('CtaPanel', () => {
  let classNamePrefix = 'test'
  let content = {};

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CtaPanel content={content} classNamePrefix={classNamePrefix}/>, div);
    expect(console.error).toHaveBeenCalled();
  })
})
