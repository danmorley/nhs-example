import React from 'react';
import ReactDOM from 'react-dom';
import GeneralTextShelf from './GeneralTextShelf';

beforeEach(function(){
  spyOn(console, 'error');
});

describe('GeneralTextShelf', () => {
  let content = {
    meta_variant: 'test'
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GeneralTextShelf content={content} />, div);
    expect(console.error).toHaveBeenCalled();
  })
})
