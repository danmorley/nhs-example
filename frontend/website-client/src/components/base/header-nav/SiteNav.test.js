import React from 'react';
import ReactDOM from 'react-dom';
import SiteNav from './SiteNav';

beforeEach(function(){
  spyOn(console, 'error');
});

describe('SiteNav', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SiteNav />, div);
    expect(console.error).toHaveBeenCalled();
  })
})
