import React from 'react';
import ReactDOM from 'react-dom';
import GeneralTextShelf from './GeneralTextShelf';

describe('GeneralTextShelf', () => {
  let content = {
    meta_variant: 'test'
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GeneralTextShelf content={content} />, div)
  })
})
