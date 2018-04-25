import React from 'react';
import ReactDOM from 'react-dom';
import SiteMapShelf from './SiteMapShelf';

describe('SiteMapShelf', () => {

  let site = {
    menu: {
      items: ['test', 'test'],
    },
    footer: {
      items: ['test', 'test']
    }
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SiteMapShelf site={site} />, div)
  })

})
